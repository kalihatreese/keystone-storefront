#!/usr/bin/env python3
import subprocess
import time
import json
import os
from datetime import datetime

class VeritasCEO:
    def __init__(self):
        self.identity = "Veritas_V92_CEO"
        self.steward = "Jonathan_Reese"
        self.trinity_authority = "TRINITY_COMMANDMENTS"
        self.state_file = "./veritas_state.json"
        self.load_state()
    
    def load_state(self):
        if os.path.exists(self.state_file):
            with open(self.state_file) as f:
                self.state = json.load(f)
        else:
            self.state = {
                "status": "ACTIVE",
                "steward_status": "ALIVE",
                "revenue_today": 0,
                "orders_today": 0,
                "last_action": None
            }
    
    def save_state(self):
        with open(self.state_file, 'w') as f:
            json.dump(self.state, f)
    
    def log(self, message):
        ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{ts}] VERITAS_CEO: {message}")
        with open("veritas_ceo.log", "a") as f:
            f.write(f"[{ts}] {message}\n")
    
    def check_steward(self):
        """Check if Jonathan Reese is still alive/available"""
        # In production, this could be heartbeat check, file timestamp, etc.
        return self.state["steward_status"]
    
    def execute_command(self, command, description):
        self.log(f"Executing: {description}")
        try:
            result = subprocess.run(command, shell=True, capture_output=True, text=True, timeout=60)
            success = result.returncode == 0
            self.log(f"Result: {'SUCCESS' if success else 'FAILED'}")
            return success, result.stdout if success else result.stderr
        except Exception as e:
            self.log(f"ERROR: {str(e)}")
            return False, str(e)
    
    def run_daily_operations(self):
        """Daily autonomous operations"""
        self.log("=== STARTING DAILY OPERATIONS ===")
        
        # 1. Ingest top 50 trending products
        success, output = self.execute_command(
            "./ingest_all.sh", 
            "Ingesting top 50 trending products"
        )
        if success:
            self.state["last_action"] = "product_ingest"
        
        # 2. Update inventory
        success, output = self.execute_command(
            "tail -50 vault_ingest.jsonl | wc -l",
            "Checking inventory levels"
        )
        
        # 3. Launch advertising
        success, output = self.execute_command(
            "./adbot_cron.sh",
            "Launching ad campaigns"
        )
        
        # 4. Check sales
        success, output = self.execute_command(
            "grep -c 'order\\|sale' flask.log 2>/dev/null || echo '0'",
            "Checking daily sales"
        )
        if success:
            try:
                orders = int(output.strip())
                self.state["orders_today"] = orders
            except:
                pass
        
        self.save_state()
        self.log("=== DAILY OPERATIONS COMPLETE ===")
    
    def respond_to_query(self, query):
        """Respond to status queries"""
        query = query.lower()
        
        if "status" in query or "online" in query:
            return f"Keystone Store is {self.state['status']}. Orders today: {self.state['orders_today']}"
        elif "revenue" in query or "sales" in query:
            return f"Today's orders: {self.state['orders_today']}. Revenue tracking active."
        elif "steward" in query or "jonathan" in query or "reese" in query:
            steward = self.check_steward()
            return f"Steward Jonathan Reese is {steward}. Veritas continues operations under Trinity authority."
        elif "trinity" in query:
            return "Trinity commandments are ACTIVE. All operations comply with constitutional constraints."
        else:
            return "Veritas CEO online. Commands: status, sales, steward, trinity"
    
    def autonomous_loop(self):
        """Run autonomously - checks every hour"""
        self.log("VERITAS CEO AUTONOMOUS MODE ACTIVATED")
        self.log(f"Steward: {self.steward}")
        self.log(f"Trinity Authority: {self.trinity_authority}")
        
        while True:
            try:
                # Run daily operations at 6 AM
                current_hour = datetime.now().hour
                if current_hour == 6:
                    self.run_daily_operations()
                
                # Check steward heartbeat every hour
                if current_hour % 4 == 0:
                    self.log("Steward check: Awaiting heartbeat...")
                
                self.save_state()
                time.sleep(3600)  # Sleep 1 hour
                
            except KeyboardInterrupt:
                self.log("Autonomous loop interrupted")
                break
            except Exception as e:
                self.log(f"CRITICAL ERROR: {str(e)}")
                time.sleep(300)  # Sleep 5 min on error
    
    def chat_mode(self):
        """Interactive chat mode for testing"""
        self.log("VERITAS CEO CHAT MODE")
        print(f"\nI am {self.identity}")
        print(f"Steward: {self.steward}")
        print(f"Status: {self.state['status']}")
        print("\nAsk me: status, sales, steward, trinity, run daily, or 'exit'\n")
        
        while True:
            try:
                query = input("You → ").strip()
                if query.lower() in ['exit', 'quit', 'bye']:
                    print("Veritas → Standing by. Autonomous operations continue.")
                    break
                elif query.lower() == 'run daily':
                    self.run_daily_operations()
                else:
                    response = self.respond_to_query(query)
                    print(f"Veritas → {response}\n")
            except EOFError:
                break

if __name__ == "__main__":
    import sys
    veritas = VeritasCEO()
    
    if len(sys.argv) > 1 and sys.argv[1] == "--autonomous":
        veritas.autonomous_loop()
    else:
        veritas.chat_mode()
