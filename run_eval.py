import json
import os
import sys
import subprocess

nb_path = r"c:\Users\hp\Desktop\tp\Crop_Recommendation_AI.ipynb"

# Ensure required packages exist
req = ["pandas","numpy","scikit-learn"]
for pkg in req:
    try:
        __import__(pkg)
    except Exception:
        subprocess.run([sys.executable, "-m", "pip", "install", pkg, "-q"], check=False)

import pandas as pd
import numpy as np
from sklearn.metrics import confusion_matrix

with open(nb_path, "r", encoding="utf-8") as f:
    nb = json.load(f)

need_ids = {"cell-2","cell-3","cell-8","cell-9","cell-10","cell-11"}

ctx = {}
code_cells = [c for c in nb.get("cells", []) if c.get("cell_type") == "code"]

for c in code_cells:
    cid = c.get("metadata", {}).get("id") or c.get("id") or c.get("id")
    # Some notebooks store id at top-level; handle that too
    if not cid:
        cid = c.get("id")
    if cid in need_ids:
        src = "".join(c.get("source", []))
        # Execute in the same dict so variables persist across cells
        exec(src, ctx)

if "model" not in ctx or "le" not in ctx or "y_test" not in ctx or "y_pred" not in ctx:
    raise RuntimeError("Did not execute expected notebook cells; missing model/labels/preds")

cm = confusion_matrix(ctx["y_test"], ctx["y_pred"])
classes = list(ctx["le"].classes_)

overall_acc = float(cm.diagonal().sum() / cm.sum()) if cm.sum() else 0.0

# Per-class accuracy: correct predictions / total actual for that class
row_sums = cm.sum(axis=1)
per_class_acc = []
for i, cls in enumerate(classes):
    total = int(row_sums[i])
    correct = int(cm[i, i])
    acc = float(correct / total) if total else 0.0
    per_class_acc.append((cls, correct, total, acc))

# Sort by worst first (useful)
per_class_acc_sorted = sorted(per_class_acc, key=lambda x: x[3])

print(f"Overall accuracy: {overall_acc*100:.2f}%")
print("Per-crop accuracy (correct/actual):")
for cls, correct, total, acc in per_class_acc_sorted:
    print(f"- {cls:14s} {correct}/{total:<4d} => {acc*100:5.2f}%")

# Also print macro avg
macro = float(np.mean([x[3] for x in per_class_acc]))
print(f"Macro average per-crop accuracy: {macro*100:.2f}%")
