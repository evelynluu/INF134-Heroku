# INF134-Heroku

Heroku is currently linked to the master branch of the evelynluu/INF134-Heroku repo. Please do not push anything to the master branch because it will mean we are submitting that work.

How to preview your work through GitHub:

1. Please first push your files to a branch with your name on it.
2. Afterwards, push those same files in step 1 to the gh-pages branch. 
3. Go to www.evelynluu.github.io/INF134-Heroku/index to view your files. 
4. Repeat steps 1-3 until you are finished editing your files.
5. When finished, please delete all of your files from the gh-pages branch. Your work will still be saved in the branch with your name on it and this step will help prevent merge conflicts.

---

## HTML Files

- index.html = Home page where the user HAS NOT signed in
- [missing] account.html = Home page where the user HAS signed in

## PHP Files

- calendar.php = Creates the calendar widget
- [missing] chart.php = Creates the stress chart widget

## CSS Files

- index.css = Formats the website
- calendar.css = Formats the calendar widget
- chart.css = Formats the stress chart widget

## Javascript Files

- index.js = Registration and logging in
- [missing] account.js = Pulls user info from the DB, adds events to the calendar, and logging out 
- [missing] tabs.js = Switches between tabs and dynamically updates the calendar and the stress chart
- [missing] d3.min.js =  Creates the charts

---

## Links

How to use ClearDB MySQL Database Ignite:

1) Download a GUI database manager: [Windows](http://www.mysql.com/products/workbench/) or [Mac](http://www.sequelpro.com/)
2) Read this guide on connecting ClearDB using SSL encryption: https://www.cleardb.com/developers/ssl_connections
  - You will need to go through the following sections: Overview, Preparing for SSL connectivity, and Connecting via SSL to ClearDB using PHP.
3) Read the official PHP documentation for "Connecting via SSL to ClearDB using PHP": http://php.net/manual/en/mysqli.ssl-set.php

How to create a div container with tabs:

- http://codepen.io/cssjockey/pen/jGzuK

How to load a php file into a div by jquery:

- http://stackoverflow.com/questions/12524228/how-to-load-php-file-into-div-by-jquery 
- http://api.jquery.com/load/

How to create a registration and login form in php and jquery:

- http://www.html-form-guide.com/php-form/php-registration-form.html
- http://www.phpeasystep.com/phptu/6.html
- http://mrbool.com/how-to-create-a-login-page-with-php-and-mysql/28656
- http://www.wikihow.com/Create-a-Secure-Login-Script-in-PHP-and-MySQL
- http://www.sourcecodester.com/tutorials/php/4340/how-create-registration-page-phpmysql.html
