# Use a imagem oficial do Nginx baseada no Alpine Linux, que é bem leve.
FROM nginx:alpine

# Copia todos os arquivos do seu projeto (a pasta atual) para o diretório padrão do Nginx.
COPY . /usr/share/nginx/html

# Expõe a porta 80, que é a porta padrão que o Nginx usa para servir conteúdo HTTP.
EXPOSE 80

# O comando para iniciar o Nginx já está definido na imagem base.