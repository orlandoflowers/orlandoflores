# Configuración de dominio orlandoflores.com en GoDaddy para Fly.io

## Paso 1: Configurar certificado SSL en Fly.io

En tu terminal, ejecuta:

```bash
flyctl certs create orlandoflores.com
flyctl certs create www.orlandoflores.com
```

## Paso 2: Obtener las IPs de tu aplicación en Fly.io

```bash
flyctl ips list
```

Anota las direcciones IP asignadas (tanto IPv4 como IPv6).

## Paso 3: Configurar registros DNS en GoDaddy

Inicia sesión en tu cuenta de GoDaddy y ve a la sección DNS de tu dominio `orlandoflores.com`. Configura los siguientes registros:

### Para el dominio principal (orlandoflores.com)

| Tipo  | Nombre | Valor                  | TTL    |
|-------|--------|------------------------|--------|
| A     | @      | 66.241.124.49          | 1 hora |
| AAAA  | @      | 2a09:8280:1::6d:d205:0 | 1 hora |

### Para el subdominio www (www.orlandoflores.com)

| Tipo  | Nombre | Valor                | TTL    |
|-------|--------|----------------------|--------|
| CNAME | www    | orlandoflores.fly.dev | 1 hora |

> **Nota**: Es esencial usar registros A y AAAA para el dominio raíz, ya que los registros CNAME no son adecuados para dominios raíz según las especificaciones DNS. Para el subdominio www, un CNAME es la opción óptima.

## Paso 4: Verificar la configuración

Después de configurar los registros DNS y esperar a que se propaguen (puede llevar hasta 48 horas), verifica que tu dominio esté funcionando correctamente:

```bash
flyctl certs check orlandoflores.com
flyctl certs check www.orlandoflores.com
```

También puedes usar herramientas como [DNSChecker](https://dnschecker.org/) para verificar la propagación DNS, y comandos como:

```bash
dig orlandoflores.com           # Verificar registro A del dominio principal
dig -t AAAA orlandoflores.com   # Verificar registro AAAA (IPv6)
dig -t CNAME www.orlandoflores.com # Verificar CNAME del subdominio www
```

## Solución de problemas comunes

1. **Errores de certificado SSL**: Si ves errores relacionados con la verificación del SSL, asegúrate de que los registros DNS estén correctamente configurados.

2. **Redirección www a no-www**: La redirección de www a no-www (o viceversa) está configurada en el archivo `nginx.conf`. Esta configuración se aplica una vez que el tráfico llega a tu aplicación.

3. **Tiempo de propagación DNS**: Aunque los cambios DNS pueden tardar hasta 48 horas en propagarse completamente, a menudo son visibles en pocas horas. Sé paciente si no ves los cambios inmediatamente.

4. **Verificación de la aplicación**: Asegúrate de que tu aplicación esté funcionando correctamente en `orlandoflores.fly.dev` antes de configurar el dominio personalizado. 