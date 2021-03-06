
CREATE DATABASE virtualWorld;

USE virtualWorld;

CREATE TABLE Pessoa (
    IDPESSOA INT PRIMARY KEY AUTO_INCREMENT,
    NOME VARCHAR(30) NOT NULL,
    FOTO VARCHAR(100),
    CPF VARCHAR(11) NOT NULL,    
    RG VARCHAR(255) UNIQUE NOT NULL,
    PASSWORD VARCHAR(10) NOT NULL,
    DESCRICAO VARCHAR(30),
    ID_ENDERECO INT,
    ID_TELEFONE INT
);

CREATE TABLE Telefone (
    IDTELEFONE INT PRIMARY KEY AUTO_INCREMENT,
    DDD VARCHAR(4),
    NUMERO VARCHAR(15)
);


CREATE TABLE Vendedor(
    IDVENDEDOR INT PRIMARY KEY AUTO_INCREMENT,
    ID_TIME INT,
    ID_PESSOA INT,
    DATA_CONTRATACAO DATE DEFAULT NULL,
    DATA_SAIDA DATE,
    SALARIO FLOAT
);

CREATE TABLE Estado(
    IDESTADO INT PRIMARY KEY AUTO_INCREMENT,
    ESTADO VARCHAR(25) NOT NULL
);

CREATE TABLE Bairro(
    IDBAIRRO INT PRIMARY KEY AUTO_INCREMENT,
    BAIRRO VARCHAR(25) NOT NULL
);

CREATE TABLE Cidade(
    IDCIDADE INT PRIMARY KEY AUTO_INCREMENT,
    CIDADE VARCHAR(25) NOT NULL
);


CREATE TABLE Endereco(
    IDENDERECO INT PRIMARY KEY AUTO_INCREMENT,
    RUA VARCHAR(25) NOT NULL,
    NUMERO INT NOT NULL,
    COMPLEMENTO VARCHAR(15),
    ID_ESTADO INT,
    ID_BAIRRO INT,
    ID_CIDADE INT,
    FOREIGN KEY (ID_ESTADO) REFERENCES Estado(IDESTADO),
    FOREIGN KEY (ID_BAIRRO) REFERENCES Bairro(IDBAIRRO),
    FOREIGN KEY (ID_CIDADE) REFERENCES Cidade(IDCIDADE)
);

CREATE TABLE Jogador(
    IDJOGADOR INT PRIMARY KEY AUTO_INCREMENT,
    ID_VENDEDOR INT DEFAULT NULL,
    ID_TIME INT DEFAULT NULL,
    ID_ESCOLA INT DEFAULT NULL, 
    PESO VARCHAR(5) NOT NULL,
    PRECO FLOAT(20,2),
    IDADE INT,
    ALTURA FLOAT,
    POSICAO VARCHAR(25),
    ID_PESSOA INT
);

CREATE TABLE Escola(
    IDESCOLA INT PRIMARY KEY AUTO_INCREMENT,
    CNPJ VARCHAR(25) UNIQUE NOT NULL,
    PASSWORD VARCHAR(11) NOT NULL,
    NOME VARCHAR(50) NOT NULL,
    DESCRICAO VARCHAR(50),
    FOTO VARCHAR(100),
    ID_TELEFONE INT,
    ID_ENDERECO INT
);


CREATE TABLE Time(
    IDTIME INT PRIMARY KEY AUTO_INCREMENT,
    CNPJ VARCHAR(18) NOT NULL,
    NOME VARCHAR(50) NOT NULL,
    NUMERO_JOGADORES_COMPRADOS INT,
    FOTO VARCHAR(100),
    ID_TELEFONE INT,
    ID_ENDERECO INT
);



CREATE TABLE AnaliseVenda(
    DATA_VENDA DATE,
    PRECO_VENDA FLOAT,
    ID_VENDEDOR INT,
    ID_TIME INT,
    ID_JOGADOR INT,
    PRIMARY KEY (ID_VENDEDOR , ID_TIME, ID_JOGADOR)
);


CREATE TABLE FrequentaEscola (
    ID_JOGADOR INT,
    ID_ESCOLA INT,
    PRIMARY KEY (ID_JOGADOR, ID_ESCOLA)
);


CREATE TABLE FrequentaTime (
    DATA_INICIO DATE,
    DATA_SAIDA DATE,
    ID_JOGADOR INT,
    ID_TIME INT,
    PRIMARY KEY (ID_JOGADOR , ID_TIME)
);


CREATE TABLE Observa(
    ID_VENDEDOR INT,
    ID_ESCOLA INT,
    DATA_OBSERVACAO DATE,
    PRIMARY KEY (ID_VENDEDOR , ID_ESCOLA)
);

ALTER TABLE Pessoa ADD CONSTRAINT pessoa_fk_endereco_id FOREIGN KEY(ID_ENDERECO) REFERENCES Endereco(IDENDERECO);
ALTER TABLE Pessoa ADD CONSTRAINT pessoa_fk_telefone_id FOREIGN KEY(ID_TELEFONE) REFERENCES Telefone(IDTELEFONE);

ALTER TABLE Escola ADD COLUMN ID_Endereco INT;
ALTER TABLE Escola ADD CONSTRAINT escola_fk_endereco_id FOREIGN KEY (ID_Endereco) REFERENCES Endereco(IDEndereco);
ALTER TABLE Escola ADD CONSTRAINT escola_fk_telefone_id FOREIGN KEY(ID_TELEFONE) REFERENCES Telefone(IDTELEFONE);

ALTER TABLE Time ADD CONSTRAINT time_fk_telefone_id FOREIGN KEY(ID_TELEFONE) REFERENCES Telefone(IDTELEFONE);
ALTER TABLE Time ADD CONSTRAINT time_fk_endereco_id FOREIGN KEY(ID_ENDERECO) REFERENCES Endereco(IDENDERECO);


ALTER TABLE Vendedor ADD CONSTRAINT vendedor_fk_pessoa_id FOREIGN KEY(ID_PESSOA) REFERENCES Pessoa(IDPESSOA);
ALTER TABLE Vendedor ADD CONSTRAINT vendedor_fk_time_id FOREIGN KEY (ID_TIME) REFERENCES Time(IDTIME);

ALTER TABLE Jogador ADD CONSTRAINT jogador_fk_pessoa_id FOREIGN KEY(ID_PESSOA) REFERENCES Pessoa(IDPESSOA);
ALTER TABLE Jogador ADD CONSTRAINT jogador_fk_time_id FOREIGN KEY (ID_TIME) REFERENCES Time(IDTIME);
ALTER TABLE Jogador ADD CONSTRAINT jogador_fk_escola_id FOREIGN KEY (ID_ESCOLA) REFERENCES Escola(IDESCOLA);
ALTER TABLE Jogador ADD CONSTRAINT jogador_fk_vendedor_id FOREIGN KEY(ID_VENDEDOR) REFERENCES Vendedor(IDVENDEDOR);

ALTER TABLE AnaliseVenda ADD CONSTRAINT analiseVenda_fk_time_id FOREIGN KEY (ID_TIME) REFERENCES Time(IDTIME);
ALTER TABLE AnaliseVenda ADD CONSTRAINT analiseVenda_fk_vendedor_id FOREIGN KEY (ID_VENDEDOR) REFERENCES Vendedor(IDVENDEDOR);
ALTER TABLE AnaliseVenda ADD CONSTRAINT analiseVenda_fk_jogador_id   FOREIGN KEY(ID_JOGADOR) REFERENCES Jogador(IDJOGADOR);

ALTER TABLE FrequentaEscola ADD CONSTRAINT frequentaEscola_fk_jogador_id FOREIGN KEY(ID_JOGADOR) REFERENCES Jogador(IDJOGADOR);
ALTER TABLE FrequentaEscola ADD CONSTRAINT frequentaEscola_fk_escola_id FOREIGN KEY(ID_ESCOLA) REFERENCES Escola(IDESCOLA);


ALTER TABLE FrequentaTime ADD CONSTRAINT frequentaTime_fk_jogador_id FOREIGN KEY(ID_JOGADOR) REFERENCES Jogador(IDJOGADOR);
ALTER TABLE FrequentaTime ADD CONSTRAINT frequentaTime_fk_time_id FOREIGN KEY(ID_TIME) REFERENCES Time(IDTIME);

ALTER TABLE Observa ADD CONSTRAINT observa_fk_vendedor_id FOREIGN KEY(ID_VENDEDOR) REFERENCES Vendedor(IDVENDEDOR);
ALTER TABLE Observa ADD CONSTRAINT observa_fk_escola_id FOREIGN KEY(ID_ESCOLA) REFERENCES Escola(IDESCOLA);


INSERT INTO Telefone(DDD,NUMERO) VALUES ("84","99999-9999");
INSERT INTO Telefone(DDD,NUMERO) VALUES ("85","7777-7777");
INSERT INTO Telefone(DDD,NUMERO) VALUES ("86","6666-66666");
INSERT INTO Telefone(DDD,NUMERO) VALUES ("87","555555-5555");
INSERT INTO Telefone(DDD,NUMERO) VALUES ("88","111111-1111");

INSERT INTO Pessoa (NOME, FOTO, CPF,RG, PASSWORD, DESCRICAO, ID_TELEFONE , ID_ENDERECO) VALUES ('Maria' , 'Tô sem' , '45646' , '534354', '45646', "Sou bom" , 2 , NULL);
INSERT INTO Pessoa (NOME, FOTO, CPF,RG, PASSWORD, DESCRICAO, ID_TELEFONE, ID_ENDERECO) VALUES ('Tiago' , 'Tô sem' , '456454' , '45645645', 'Hachiko', "Não existe ninguém melhor" , 1 , NULL);
INSERT INTO Pessoa (NOME, FOTO, CPF,RG, PASSWORD, DESCRICAO, ID_TELEFONE, ID_ENDERECO) VALUES ('Higor' , 'Tô sem' , '6564564' , '4564564', 'Hotdog', "Contrate-me e verás" , 4 , NULL);
INSERT INTO Pessoa (NOME, FOTO, CPF,RG, PASSWORD, DESCRICAO, ID_TELEFONE, ID_ENDERECO) VALUES ('Paulo' , 'Tô sem' , '5646546' , '1591591', 'Alemão', "não ligo" , 5 , NULL);
INSERT INTO Pessoa (NOME, FOTO, CPF,RG, PASSWORD, DESCRICAO, ID_TELEFONE, ID_ENDERECO) VALUES ('Josefina' , 'Tô sem' , '55465465' , '1549879', 'Husky', "só quero o dinheiro" , 3 , NULL);

INSERT INTO Vendedor(DATA_CONTRATACAO , DATA_SAIDA ,SALARIO , ID_PESSOA) VALUES ("2018/05/04" , "2099/05/23" , 100000.13 , 1);
INSERT INTO Vendedor(DATA_CONTRATACAO , DATA_SAIDA ,SALARIO , ID_PESSOA) VALUES ("2020/05/04" , "2101/05/23" , 9999999.99 , 2);
INSERT INTO Vendedor(DATA_CONTRATACAO , DATA_SAIDA ,SALARIO , ID_PESSOA) VALUES ("2021/05/04" , "2102/05/23" , 888888.13 , 3);
INSERT INTO Vendedor(DATA_CONTRATACAO , DATA_SAIDA ,SALARIO , ID_PESSOA) VALUES ("2023/05/04" , "2103/05/23" , 777777.13 , 4);
INSERT INTO Vendedor(DATA_CONTRATACAO , DATA_SAIDA ,SALARIO , ID_PESSOA) VALUES ("2024/05/04" , "2104/05/23" , 666666.13 , 5);

INSERT INTO Escola(CNPJ , PASSWORD , NOME ,DESCRICAO, FOTO , ID_TELEFONE, ID_ENDERECO ) VALUES ("1234","a","Santo","Muit boa","Nenhuma ", NULL, NULL);
INSERT INTO Escola(CNPJ , PASSWORD , NOME ,DESCRICAO, FOTO , ID_TELEFONE, ID_ENDERECO ) VALUES ("456","d","Deus","Muito Ruim","Nenhuma", NULL, NULL);
INSERT INTO Escola(CNPJ , PASSWORD , NOME ,DESCRICAO, FOTO , ID_TELEFONE, ID_ENDERECO ) VALUES ("78","m","Protect","Mais ou menos","Nenhuma", NULL, NULL);
INSERT INTO Escola(CNPJ , PASSWORD , NOME ,DESCRICAO, FOTO , ID_TELEFONE, ID_ENDERECO ) VALUES ("9","i","Nós","Vemquem quer","Nenhuma", NULL, NULL);
INSERT INTO Escola(CNPJ , PASSWORD , NOME ,DESCRICAO, FOTO , ID_TELEFONE, ID_ENDERECO ) VALUES ("10","n","AEW","Nem ligo","Nenhuma", NULL, NULL);


INSERT INTO Bairro (BAIRRO) VALUES ("Emboca");
INSERT INTO Bairro (BAIRRO) VALUES ("São José");
INSERT INTO Bairro (BAIRRO) VALUES ("Amapá");
INSERT INTO Bairro (BAIRRO) VALUES ("Frigorifico");
INSERT INTO Bairro (BAIRRO) VALUES ("Simbinha");

INSERT INTO Cidade (CIDADE) VALUES ("Tangamandápio");
INSERT INTO Cidade (CIDADE) VALUES ("Peteleko");
INSERT INTO Cidade (CIDADE) VALUES ("Bumba");
INSERT INTO Cidade (CIDADE) VALUES ("Manpi");
INSERT INTO Cidade (CIDADE) VALUES ("Codade");

INSERT INTO Estado (ESTADO) VALUES ("RN");
INSERT INTO Estado (ESTADO) VALUES ("RJ");
INSERT INTO Estado (ESTADO) VALUES ("RG");
INSERT INTO Estado (ESTADO) VALUES ("RH");
INSERT INTO Estado (ESTADO) VALUES ("RK");