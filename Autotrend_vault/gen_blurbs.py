import openai

openai.api_key = "YOUR_API_KEY"


def generate_blurb(product):
    prompt = f"Write a viral 1-line pitch for: {product}"
    r = openai.ChatCompletion.create(
        model="gpt-4", messages=[{"role": "user", "content": prompt}]
    )
    return r.choices[0].message.content.strip()


if __name__ == "__main__":
    with open("vault_ingest.txt") as f:
        products = [line.strip() for line in f if line.strip()]
    with open("vault_blurbs.txt", "w") as f:
        for p in products:
            f.write(f"{p} — {generate_blurb(p)}\n")
