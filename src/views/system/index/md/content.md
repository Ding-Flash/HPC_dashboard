## 硬件配置

本系统配置了3个登录节点，260个CPU计算节点，10个GPU计算节点，一套1.8P 共享存储。所有节点通过100Gb/s EDR Infiniband互联网组成计算和存储网络。系统详细配置如下：

- 登录管理节点：共3个登录节点；
- GPU计算节点：共10个GPU计算节点，每个节点配置2颗Intel Golden 6240系列处理器，共36个物理核，384GB内存，8个NVIDIA V100 GPU卡；
- CPU计算节点：共260个CPU计算节点，每个节点配置2颗Intel Golden 6240系列处理器，共36个物理核，384GB内存（根据IB网络配置，单个作业最多使用160个计算节点）；
- 并行存储系统：配置一套DDN并行存储系统，共配置1.8PB存储容量；
- 管理网络：配置一套千兆管理网；
- 带外管理网络：配置一套千兆带外管理网；
- 计算网络：配置一套100Gb/s告诉Infiniband网；

## 软件配置

系统软件配置环境如下：

- 操作系统：采用CentOS 7.6版本操作系统；
- 作业调度软件：采用Slurm 19.04作业调度系统；
- 并行文件系统：采用DDN并行文件系统；
- 编译环境：GNU、Intel编译环境、CUDA；
- 并行环境：MPICH、MVAPICH、OPENMPI、Intel MPI；
- 应用软件：Gromacs、Lammps、R、VASP（需要授权）、OpenFoam、Ansys（试用）、Fluent（试用）、CFX（试用）、Matlab、Moose等；
- 其他工具软件：Anaconda、fftw、CAFFE、HDF5、QT、Tensorflow；

