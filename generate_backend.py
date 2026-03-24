import json

nb_path = r"c:/Users/hp/Desktop/tp/Crop_Recommendation_AI.ipynb"

with open(nb_path, "r", encoding="utf-8") as f:
    nb = json.load(f)

need_ids = {"cell-2","cell-3","cell-8","cell-9","cell-10","cell-16","cell-18"}

ctx = {}
code_cells = [c for c in nb.get("cells", []) if c.get("cell_type") == "code"]

for c in code_cells:
    cid = c.get("metadata", {}).get("id") or c.get("id")
    if cid in need_ids:
        src = "".join(c.get("source", []))
        print(f"Executing {cid}...")
        exec(src, ctx)

print("Backend generation complete. app.py and models are ready.")
