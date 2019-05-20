# sd2019a-exam2
Repository for the exam2

**estudiantes**: Daniel perez Garcia (A00018200), Joan Sebastian Garcia (A00329796), Edisson Guerrero

## Configuración de entorno

El entorno que se va a desplegar son 3 máquinas que cumplen con los roles de: una ser host maestro y los otros dos, ser nodos workers. Ambas máquinas serán aprovisionados a través de un Ansible playbook. Playbook que se encuentra en playbooks/playbook.yml.

El siguiente código muestra la instalación de Docker para todos los nodos.
![alt text](https://github.com/Danielperga97/sd2019a-exam2/blob/danielperga97/images/a1.PNG)

Docker ser utilizará con el fin de crear entre los 3 nodos un cluster para el despliegue de servicios distribuidos, esto aumentará la alta disponibilidad del servicio.

A su vez, se instalara GlusterFs y XFS con el objetivo de crear un cluster de almacenamiento.
![alt text](https://github.com/Danielperga97/sd2019a-exam2/blob/danielperga97/images/a2.PNG)

Se debe activar los puertos necesarios en el Firewall para que el Gluster trabaje de forma correcta.
![alt text](https://github.com/Danielperga97/sd2019a-exam2/blob/danielperga97/images/a3.PNG)

Se crea la partición en cada nodo para adjuntar el disco que utilizará el Gluster
Se crea el FileSystem en el disco 
Se montan los discos
![alt text](https://github.com/Danielperga97/sd2019a-exam2/blob/danielperga97/images/a4.PNG)

Se inicia el Cluster del Docker Swarm en el nodo MAESTRO
![alt text](https://github.com/Danielperga97/sd2019a-exam2/blob/danielperga97/images/a5.PNG)

Para los nodos Worker la diferencia es que NO crean el cluster de swarm sino que se unen al cluster creado
![alt text](https://github.com/Danielperga97/sd2019a-exam2/blob/danielperga97/images/a7.PNG)

## APP

La aplicacion se compone de 3 microservicios para su funcionamiento. El primero es un frontend realizado en React, el cual se encarga de obtener los datos de llave valor que se ingresaran en la base de datos. Una vez estos datos son enviados los recibe el backend, el cual fue realizado en flask y maneja la conexion con la base de datos, ademas de realizar tareas de generacion y envio de logs. Finalmente la aplicacion cuenta con una base de datos en redis configurada para tener almacenamiento persistente mediante el uso de un volumen de docker.

El frontend y el backend se pueden observar a continuacion:

![alt text](https://github.com/Danielperga97/sd2019a-exam2/blob/danielperga97/images/c2.PNG)

una vez se anade una llave se pasa al backend:

![alt text](https://github.com/Danielperga97/sd2019a-exam2/blob/danielperga97/images/c3.PNG)

Para consultar una llave el proceso es el mismo. se ingresa el valor a buscar:

![alt text](https://github.com/Danielperga97/sd2019a-exam2/blob/danielperga97/images/c4.PNG)

y el backend lo retorna:

![alt text](https://github.com/Danielperga97/sd2019a-exam2/blob/danielperga97/images/c5.PNG)


Para la recoleccion centralizada de logs se ha usado el stack EFK, sindo la aplicacion la encargada de generar los logs y enviarlos a fluentd por su respectivo puerto, para que este luego los almacene en elasticsearch y sean visibles a traves de kibana:

![alt text](https://github.com/Danielperga97/sd2019a-exam2/blob/danielperga97/images/c6.PNG)

coomo prodemos observar los logs son personalizables y en ellos se puede ver el campo operation, para indicar la operacion realizada y result para indicar el resultado. podemos ver que se han realizado queries e insertions, todos con resultado successful.

![alt text](https://github.com/Danielperga97/sd2019a-exam2/blob/danielperga97/images/c7.PNG)

**Problemas encontrados:** 

El direccionamiento de la app debe cambiarse para correcto funcionamiento, lo que implica el cambio de las ips en el codigo cada vez que se corre en una maquina distinta.
