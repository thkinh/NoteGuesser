# Use the official Nginx image as the base image
FROM nginx:alpine

# Copy all app files to the Nginx HTML directory
COPY . /usr/share/nginx/html

RUN mv /usr/share/nginx/html/app.html /usr/share/nginx/html/index.html

# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]

