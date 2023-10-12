# Binance Bridge Project

## Description

This project aims to facilitate cryptocurrency transactions by bridging traditional payment methods with the Binance cryptocurrency ecosystem. It uses Node.js, Express, and MySQL as its backend technology stack, and provides a secure, reliable, and easy-to-use service for both buyers and sellers in the crypto space.

## Features

- Payment gateway integration
- Real-time transaction tracking
- Support for multiple cryptocurrencies
- Robust security features
- Easy-to-use interface


## Installation and Setup

1. **Create the MySQL Database**

    Before running the project, create a MySQL database named `binanceBridge`.

    ```sql
    CREATE DATABASE binanceBridge;
    ```

2. **Clone the Repository**

    ```
    git clone https://github.com/gabrielmellace1/binance-bridge
    ```

3. **Install Dependencies**

    Navigate to your project directory and run:

    ```
    npm install
    ```

4. **Environment Variables**

    Copy `.env.example` to `.env` and fill in your specific settings.

    ```
    cp .env.example .env
    ```

5. **Run the Project**

    ```
    npm run start
    ```

6. **Test the webservice endpoints**

    ```
    Enter swagger which is located under /docs
    or for visual interaction, there is a index.html inside the public folder for testing
    ```



## Technologies Used

- Node.js
- Express
- TypeORM
- MySQL

