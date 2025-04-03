# Configuración de dominio orlandoflores.com en GoDaddy para Fly.io

## Paso 1: Configurar certificado SSL en Fly.io

En tu terminal, ejecuta:

```bash
flyctl certs create orlandoflores.com
flyctl certs create www.orlandoflores.com
```

## Paso 2: Obtener la dirección de tu aplicación en Fly.io

```bash
flyctl status
```

Anota la dirección en formato `[app-name].fly.dev`.

## Paso 3: Configurar registros DNS en GoDaddy

Inicia sesión en tu cuenta de GoDaddy y ve a la sección DNS de tu dominio `orlandoflores.com`. Configura los siguientes registros:

### Para el dominio principal (orlandoflores.com)

| Tipo  | Nombre | Valor                | TTL    |
|-------|--------|----------------------|--------|
| CNAME | @      | orlandoflores.fly.dev | 1 hora |

### Para el subdominio www (www.orlandoflores.com)

| Tipo  | Nombre | Valor                | TTL    |
|-------|--------|----------------------|--------|
| CNAME | www    | orlandoflores.fly.dev | 1 hora |

> **Nota**: Si GoDaddy no permite un registro CNAME para el dominio raíz (@), necesitarás usar la función de redirección de GoDaddy o un servicio como Cloudflare para gestionar tu DNS.

## Paso 4: Verificar la configuración

Después de configurar los registros DNS y esperar a que se propaguen (puede llevar hasta 48 horas), verifica que tu dominio esté funcionando correctamente:

```bash
flyctl certs check orlandoflores.com
flyctl certs check www.orlandoflores.com
```

También puedes usar herramientas como [DNSChecker](https://dnschecker.org/) para verificar la propagación DNS.

## Solución de problemas comunes

1. **Errores de certificado SSL**: Si ves errores relacionados con la verificación del SSL, asegúrate de que los registros DNS estén correctamente configurados.

2. **Redirección www a no-www**: Para redireccionar automáticamente de www a no-www (o viceversa), puedes agregar reglas de redirección en tu archivo `nginx.conf`. 