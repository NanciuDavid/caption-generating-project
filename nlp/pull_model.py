import ollama

def pull_model(model_name : str) :

    try:
        for progress in ollama.pull(model_name, stream = True):
            status = progress.get('status', '')
            completed = progress.get('completed', 0)
            total = progress.get('total', 0)


            if total:
                percent = (completed / total ) * 100
                print(f"\r{status}: {percent:.1f}%", end="", flush=True)
    except Exception as e :
        return { "error" : str(e),
                "status" : "failed"}
    
    print(f"\n Model {model_name} incarcat")