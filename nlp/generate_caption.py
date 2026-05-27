from pull_model import pull_model
import ollama

def generate_caption(text:str, model_name:str = 'llama3.2') -> str:
    pull_model(model_name)

    response = ollama.chat(
        model = model_name,
        messages=[{
            "role" : "user",
            "content" : f"Sumarizeaza acest text folosind un ton catchy: {text}"
        }]
    )

    return response["message"]["content"].strip()



