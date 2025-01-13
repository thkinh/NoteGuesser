# Use the official Nginx image as the base image
FROM nginx:alpine

# Copy all app files to the Nginx HTML directory
COPY . /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]

