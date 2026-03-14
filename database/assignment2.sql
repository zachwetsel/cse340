-- 1. Insert Tony Stark into the `account` table
INSERT INTO public.account (
	account_firstname,
	account_lastname,
	account_email,
	account_password
)
VALUES (
	'Tony',
	'Stark',
	'tony@starkent.com',
	'Iam1ronM@n'
);
-- 2. Change Tony Stark's `account_type` to `admin`
UPDATE public.account
SET account_type = 'Admin'
WHERE account_email = 'tony@starkent.com';
-- 3. Delete the Tony Stark record
DELETE FROM public.account
WHERE account_email = 'tony@starkent.com';
-- 4. Update the GM Hummer `description`
UPDATE public.inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';
-- 5. Use inner join to get `make`, `model` and `classification` for the `Sport` category
SELECT i.inv_make, i.inv_model, c.classification_name
FROM public.inventory AS i
INNER JOIN public.classification AS c
	ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';
-- 6. Update all image paths to include /vehicles
UPDATE public.inventory
SET
	inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
	inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/'); 