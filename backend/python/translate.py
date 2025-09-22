# import sys

# from transformers import MarianMTModel, MarianTokenizer

# model_path = "./model"  # Adjust if needed

# tokenizer = MarianTokenizer.from_pretrained(model_path)
# model = MarianMTModel.from_pretrained(model_path)

# if len(sys.argv) < 2:
#     print("No input provided", file=sys.stderr)
#     sys.exit(1)

# input_text = sys.argv[1]
# inputs = tokenizer(input_text, return_tensors="pt", truncation=True, padding=True)
# translated = model.generate(**inputs, max_length=512)
# output = tokenizer.decode(translated[0], skip_special_tokens=True)

# print(output)

import sys
import os
from transformers import MarianMTModel, MarianTokenizer

# Dynamically resolve the path to the model folder
current_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(current_dir, "model")  # This becomes backend/python/model

tokenizer = MarianTokenizer.from_pretrained(model_path)
model = MarianMTModel.from_pretrained(model_path)

if len(sys.argv) < 2:
    print("No input provided", file=sys.stderr)
    sys.exit(1)

input_text = sys.argv[1]
inputs = tokenizer(input_text, return_tensors="pt", truncation=True, padding=True)
translated = model.generate(**inputs, max_length=512)
output = tokenizer.decode(translated[0], skip_special_tokens=True)

print(output)

