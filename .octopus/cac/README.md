# Octopus Deploy Configuration as Code (CaC)

This directory contains the Octopus Deploy Configuration-as-Code for the moe-playground project.

## Project Configuration

- **Project Name**: moe-playground
- **Package Format**: ZIP artifact from Vite build
- **Target Role**: `static-web`

## Deployment Configuration

### Web Roots

- **Dev**: `/opt/moe-playground/dev/www`
- **Prod**: `/opt/moe-playground/prod/www`

### Hosts

- **Dev**: `playground.local.cyberninja.co.za`
- **Prod**: `playground.cyberninja.co.za`

## Deployment Process

1. **Package Upload**: GitHub Actions pushes `moe-playground.<version>.zip` to Octopus
2. **Extract**: Octopus extracts the ZIP to a temporary location
3. **Deploy**: Contents are synced to the appropriate webroot using rsync:
   ```bash
   rsync -av --delete /tmp/extract/ /opt/moe-playground/{env}/www/
   ```

## SPA Routing Configuration

**CRITICAL**: This is a Single Page Application (SPA) using React Router with client-side routing.

The web server MUST be configured to serve `index.html` for all routes that don't match static files.

### Nginx Configuration Example

```nginx
server {
    listen 80;
    server_name playground.cyberninja.co.za;
    root /opt/moe-playground/prod/www;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Apache Configuration Example

```apache
<VirtualHost *:80>
    ServerName playground.cyberninja.co.za
    DocumentRoot /opt/moe-playground/prod/www

    <Directory /opt/moe-playground/prod/www>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted

        # Enable React Router fallback
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
</VirtualHost>
```

## Deployment Steps (Octopus)

1. **Download Package**
   ```bash
   octopus package download \
     --package=moe-playground \
     --version=#{Octopus.Release.Number} \
     --destination=/tmp/moe-playground-deploy
   ```

2. **Extract Package**
   ```bash
   unzip -o /tmp/moe-playground-deploy/moe-playground.*.zip -d /tmp/moe-playground-extract
   ```

3. **Sync to Webroot**
   ```bash
   rsync -av --delete /tmp/moe-playground-extract/ /opt/moe-playground/#{Octopus.Environment.Name | ToLower}/www/
   ```

4. **Set Permissions**
   ```bash
   chown -R www-data:www-data /opt/moe-playground/#{Octopus.Environment.Name | ToLower}/www
   chmod -R 755 /opt/moe-playground/#{Octopus.Environment.Name | ToLower}/www
   ```

5. **Cleanup**
   ```bash
   rm -rf /tmp/moe-playground-deploy /tmp/moe-playground-extract
   ```

## Environment Variables

No environment variables required for the static build. All configuration is compile-time.

## Health Check

Verify deployment with:
```bash
curl -I https://playground.cyberninja.co.za
```

Expected response: `200 OK` with `Content-Type: text/html`

## Rollback Procedure

Octopus Deploy supports automatic rollback to the previous release:
```bash
octopus release deploy \
  --project=moe-playground \
  --version=<previous-version> \
  --deployTo=<environment>
```
