# Recipe App

The place for all your recipes.

## Overview

This will be a web application which allows users to save recipes to their user account. Recipes can be input by the user or found among those shared publicly by other users.

## User Demographic

The intended user demographic of this app includes anyone looking to save their recipes in a way that is easy to access from a computer, tablet, or mobile device.

## Tech Stack and Data Source

This project will be built using React, Node.js, and PostgreSQL.

A main function of the app will be allowing users to input recipes themselves to save in the app. But the database will include a table of recipes I add myself to seed the publicly-shared recipes any user can access.

## Schema

See here: <https://docs.google.com/document/d/1I0FMmJSjetVe2UONbNeNAVdlJHznNBN_bidz8J_rTgs/edit?usp=sharing>

## Features

- Search or browse for recipes shared by other users
- Save (a reference to) one of the recipes shared by others to your own recipe list in the app
- Make a copy of one of the recipes shared by others, which you can modify
- Add your own recipes (saved privately, by default)
- Make your recipe available to other users of the app
- Export/share a recipe outside the app

## Userflow

1. Landing Page - includes links to browse public recipes, login, or register
2. Public Recipes Page - shows list of public recipes
3. Recipe Detail - shows one recipe in detail with button to export/share, and, if logged in, buttons to save or copy; if recipe belongs to user, also shows button to make it private or public
4. User Recipes Page - shows list of recipes that user has saved, copied, or added
5. User Account Page - shows forms for changing email address, username, password

## Sensitive information

Passwords will be encrypted using bcrypt. The only user information collected will be email address, username, password.

## Stretch Goals

- Recipe multiplier: easily get adjusted ingredient amounts for a double batch, half batch, etc.
- Unit converter: teaspoon, tablespoon, cup, etc. This should be easy to use while viewing a Recipe Detail.
- Suggest similar recipes
