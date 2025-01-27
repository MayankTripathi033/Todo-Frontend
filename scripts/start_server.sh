#!/bin/bash

# Navigate to the application directory
cd /home/ec2-user/Todo-Frontend

# Check if PM2 is installed, and install it if not
if ! [ -x "$(command -v pm2)" ]; then
  echo "PM2 is not installed. Installing PM2..."
  npm install -g pm2
fi

# Check if the Todo-Frontend process is already running
if pm2 list | grep -q "Todo-Frontend"; then
  echo "Todo-Frontend process found. Restarting..."
  pm2 restart Todo-Frontend
else
  echo "Todo-Frontend process not found. Starting a new process..."
  pm2 start npm --name "Todo-Frontend" -- start
fi

# Save the PM2 process list to ensure it starts on system reboot
pm2 save
pm2 startup systemd --silent | grep -v "sudo" | bash