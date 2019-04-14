yum install -y rpcbind
yum install wget
yum install centos-release-gluster -y
yum install epel-release -y
yum install glusterfs-server -y
yum install -y xfsprogs
systemctl start glusterd
systemctl enable glusterd

sfdisk /dev/sdb << EOF
;
EOF

mkfs.xfs /dev/sdb1
mkdir -p /gluster/data /swarm/volumes
mount /dev/sdb1 /gluster/data/
