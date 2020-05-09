# Installing Nextcloud on Ubuntu 18.04 LTS Server

If you have snap:

```
$ sudo snap install nextcloud
```

If you don't have snap install dependencies manually:

```
apt-get install apache2 mariadb-server libapache2-mod-php7.2
apt-get install php7.2-gd php7.2-json php7.2-mysql php7.2-curl php7.2-mbstring
apt-get install php7.2-intl php-imagick php7.2-xml php7.2-zip
```

You should have the following core systems:

```
apt-get install apache2 mariadb-server libapache2-mod-php7.2
apt-get install php7.2-gd php7.2-json php7.2-mysql php7.2-curl php7.2-mbstring
apt-get install php7.2-intl php-imagick php7.2-xml php7.2-zip
```

---

Download from https://nextcloud.com/install

_*Optional:*_

Verify MD5/SHA256:

```
$ md5sum -c nextcloud-x.y.z.tar.bz2.md5 < nextcloud-x.y.z.tar.bz2
$ sha256sum -c nextcloud-x.y.z.tar.bz2.sha256 < nextcloud-x.y.z.tar.bz2
$ md5sum  -c nextcloud-x.y.z.zip.md5 < nextcloud-x.y.z.zip
$ sha256sum  -c nextcloud-x.y.z.zip.sha256 < nextcloud-x.y.z.zip
```

Verify PGP signature:

```
$ wget https://download.nextcloud.com/server/releases/nextcloud-x.y.z.tar.bz2.asc
$ wget https://nextcloud.com/nextcloud.asc
$ gpg --import nextcloud.asc
$ gpg --verify nextcloud-x.y.z.tar.bz2.asc nextcloud-x.y.z.tar.bz2
```

---

Unzip/Untar archive:

```
$ tar -xjf nextcloud-x.y.z.tar.bz2
$ unzip nextcloud-x.y.z.zip
```

Copy unarchived directory into apache:

```
$ cp -r nextcloud /var/www/html
```

---

Make data directory:

```
$ sudo mkdir /var/www/html/nextcloud/data
```

Give permissions to apache:

```
$ sudo chown -R www-data:www-data /var/www/html/nextcloud/
$ sudo chown -R www-data:www-data /var/www/html/nextcloud/.htaccess
$ sudo chown -R www-data:www-data /var/www/html/nextcloud/.user.ini
```

Restart apache and httpd:

```
$ sudo systemctl restart apache2
$ sudo systemctl restart httpd.service
```

Finally goto http://localhost/nextcloud to finish install

---

Configuration:

```
$ sudo vim /var/www/html/nextcloud/config/config.sample.php
```

---

**Posted:** 04/23/19
