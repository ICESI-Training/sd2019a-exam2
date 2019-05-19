# -*- mode: ruby -*-
# vi: set ft=ruby :
VAGRANTFILE_API_VERSION = "2"
nodes = {
  "k8s_node_0b" => { :ip => "192.168.56.101", :cpus => 3, :mem => 2560, :disk => './firstDisk.vdi', :node_name => 'node0' },
  "k8s_node_1b" => { :ip => "192.168.56.102", :cpus => 1, :mem => 1024, :disk => './secondDisk.vdi', :node_name => 'node1'},
  "k8s_node_2b" => { :ip => "192.168.56.103", :cpus => 1, :mem => 1024, :disk => './thirdDisk.vdi', :node_name => 'node2'},
  "k8s_node_3b" => { :ip => "192.168.56.104", :cpus => 1, :mem => 1024, :disk => './fourthDisk.vdi', :node_name => 'node3'}
}

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.ssh.insert_key = false
  nodes.each_with_index do |(hostname, info), index|
    config.vm.define hostname do |cfg|
      cfg.vm.provider :virtualbox do |vb, override| 
        config.vm.box = "centos_7"
        override.vm.network "private_network", ip: "#{info[:ip]}"
        #override.vm.hostname = hostname
        vb.customize ["modifyvm", :id, "--memory", "#{info[:mem]}","--cpus", "#{info[:cpus]}", "--name", "#{hostname}" ]
        unless File.exist?("#{info[:disk]}")
          vb.customize ['createhd', '--filename', "#{info[:disk]}", '--variant', 'Fixed', '--size', 5 * 1024]
        end
        vb.customize ['storageattach', :id,  '--storagectl', 'IDE', '--port', 1, '--device', 0, '--type', 'hdd', '--medium', info[:disk]]
        vb.name = hostname
        override.vm.provision "shell", inline: <<-SHELL
          echo #{info[:node_name]} > /etc/hostname
          hostname #{info[:node_name]}
        SHELL
        #override.vm.provision "shell", path: "install/configurations.sh"
        #override.vm.provision "shell", path: "install/docker.sh"
        #if info[:node_name] == 'node0' 
        #  override.vm.provision "shell", path: "install/compose.sh"
        #end
        #override.vm.provision "shell", path: "install/k8s.sh"
        #override.vm.provision "shell", path: "install/glusterfs.sh"
        override.vm.provision "file", source: "~/.ssh/id_rsa.pub", destination: "/home/vagrant/.ssh/public_key"
        override.vm.provision "shell", inline: "cat /home/vagrant/.ssh/public_key >> /home/vagrant/.ssh/authorized_keys"
        override.vm.provision "shell", inline: "rm /home/vagrant/.ssh/public_key"
      end
    end
  end
end