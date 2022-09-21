CREATE TABLE price_plans(
    id SERIAL NOT NULL PRIMARY KEY,
    plan_name VARCHAR(255) NOT NULL,
    sms_price decimal(10,2) NOT NULL,
    call_price decimal(10,2) NOT NULL
);

CREATE TABLE users(
    id SERIAL NOT NULL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    billTotals decimal(10,2) NOT NULL,
    plan_id INT,
    FOREIGN KEY (plan_id) REFERENCES price_plans(id)

);

INSERT INTO price_plans (plan_name,sms_price,call_price) VALUES ('sms100', 0.20 , 2.35);
INSERT INTO price_plans (plan_name,sms_price,call_price) VALUES ('call100', 0.45 , 1.75);
INSERT INTO price_plans (plan_name,sms_price,call_price) VALUES ('text-me', 0.17 , 1.54);


ALTER TABLE users DROP COLUMN billTotals;
