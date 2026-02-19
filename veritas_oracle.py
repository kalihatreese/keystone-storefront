import ijson
import os

PATH_JSON = "/data/data/com.termux/files/home/keystone-storefront/conversations.json"

def stream_context():
    if not os.path.exists(PATH_JSON):
        return

    # Use 'rb' for binary streaming - critical for 185MB+
    with open(PATH_JSON, 'rb') as f:
        # We look for 'content' or 'text' keys within the conversation array
        parser = ijson.parse(f)
        for prefix, event, value in parser:
            if event == 'string':
                val_lower = value.lower()
                # Logic: Detect specific 'Architect' directives
                if "v92" in val_lower:
                    print("DIRECTIVE_DETECTED: ALIGNMENT_V92")
                if "lock and key" in val_lower:
                    print("DIRECTIVE_DETECTED: SECURITY_PROTOCOL_ALPHA")
                if "subscription" in val_lower:
                    print("DIRECTIVE_DETECTED: MONETIZATION_ACTIVE")

if __name__ == "__main__":
    stream_context()
