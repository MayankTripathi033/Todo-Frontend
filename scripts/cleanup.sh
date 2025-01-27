#!/bin/bash

# Check if the file exists
if [ -f "/home/ec2-user/Todo-Frontend/.gitignore" ]; then
    echo "Removing .gitignore file..."
    sudo rm -f /home/ec2-user/Todo-Frontend/.gitignore
else
    echo ".gitignore file not found, skipping removal."
fi
