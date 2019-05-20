#//sudo pip install docker-compose
#//sudo yum upgrade python*
#//docker-compose version
#//sudo yum -y update

#echo Installing Docker...
#curl -sSL https://get.docker.com/ | sh
#usermod -aG docker $(whoami)
#systemctl enable docker.service
#systemctl start docker.service

#SCRIPT

#$manager_script = <<SCRIPT
#echo Swarm Init...
#docker swarm init --listen-addr 10.100.199.200:2377 --advertise-addr 10.100.199.200:2377
#docker swarm join-token --quiet worker > /vagrant/worker_token
#docker run -it --name icesi_db icesi_db:0.1.0 /bin/bash

#SCRIPT

#$worker_script = <<SCRIPT
#echo Swarm Join...
#docker swarm join --token $(cat /vagrant/worker_token) 10.100.199.200:2377
#SCRIPT

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure('2') do |config|

vm_box = 'centos/7'
VAGRANT_ROOT = File.dirname(File.expand_path(__FILE__))
NODES = 3
DISKS = 1
DISK_SIZE = 5


  config.vm.define :manager, primary: true  do |manager|
    manager.vm.box = vm_box
    manager.vm.box_check_update = true
    manager.vm.network :private_network, ip: "10.0.0.1"
    manager.vm.network :forwarded_port, guest: 8080, host: 8080
    manager.vm.network :forwarded_port, guest: 5000, host: 5000
    manager.vm.hostname = "manager"
    manager.vm.synced_folder ".", "/vagrant"
  #  manager.vm.provision "shell", inline: $install_docker_script, privileged: true
   # manager.vm.provision "shell", inline: $manager_script, privileged: true
    manager.vm.provider "virtualbox" do |vb|
      vb.name = "manager"
      vb.memory = "1024"
    
    more_disk = File.join(VAGRANT_ROOT, "DATA/node_master_disk.vdi")
          unless File.exist?(more_disk)
            vb.customize ['createhd', '--filename', more_disk,'--variant', 'Fixed','--size', DISK_SIZE * 1024]
          end
          vb.customize ['storageattach', :id, '--storagectl', "IDE", '--port', 1, '--device', 0 , '--type', 'hdd', '--medium', more_disk]  

    end
    config.vm.provision "ansible" do |ansible|
    ansible.playbook = "playbooks/playbook.yml"
  end

		
  end

  (1..NODES).each do |i|
    config.vm.define "worker0#{i}" do |worker|
      worker.vm.box = vm_box
      worker.vm.box_check_update = true
      worker.vm.network :private_network, ip: "10.0.0.1#{i}"
      worker.vm.hostname = "worker0#{i}"
      worker.vm.synced_folder ".", "/vagrant"
   #   worker.vm.provision "shell", inline: $install_docker_script, privileged: true
    #  worker.vm.provision "shell", inline: $worker_script, privileged: true
      worker.vm.provider "virtualbox" do |vb|
        vb.name = "worker0#{i}"
        vb.memory = "1024"
     
(1..DISKS).each do |k|

          more_disk = File.join(VAGRANT_ROOT, "DATA/node#{i}_disk#{k}.vdi")
          unless File.exist?(more_disk)
            vb.customize ['createhd', '--filename', more_disk,'--variant', 'Fixed','--size', DISK_SIZE * 1024]
          end
          vb.customize ['storageattach', :id, '--storagectl', "IDE", '--port', 1, '--device', 0 , '--type', 'hdd', '--medium', more_disk]

end


 end
    end
  end

config.vm.provision "ansible" do |ansible|
    ansible.playbook = "playbooks/playbook.yml"
  end
end
