1) Install ansible [link](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html)  

2) Add remote server ip address to `/etc/ansible/hosts/` in `pediatry` group    
Example:  
```
[pediatry]
192.168.1.10
```

3) Add ssh public key to remote host:  
```
ssh-copy-id username@192.168.1.10
```

4) Install dependencies  
```
ansible-galaxy install -r deploy/requirements.yml
```

5) Execute playbook (need root password for remote server):  
```
ansible-playbook deploy/main.yml -K -u username
```

