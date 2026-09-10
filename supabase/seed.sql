insert into public.quests(title,description,kind,target,reward_coins,reward_xp) values
('Login harian','Masuk ke website hari ini','login',1,15,40),
('Siram pohon','Siram Sakura Coin Tree 3 kali','plant_water',3,25,60),
('Jual item','Buat satu listing Marketplace','market_list',1,30,80),
('Kolektor','Miliki 10 jenis item','inventory_types',10,50,100);
insert into public.events(title,description,starts_at,ends_at) values ('Sakura Festival','Bonus hadiah untuk seluruh pemain',now(),now()+interval '7 days');
insert into public.shop_products(kind,name,description,price_idr,price_coins,stock) values
('role','VIP Sakura','Role premium Sakura Keeper',50000,0,null),
('role','Royal Bloom','Role kolektor eksklusif',100000,0,null),
('asset','Custom Wings','Asset sayap khusus pesanan',75000,0,20),
('asset','Profile Badge','Badge profil edisi terbatas',25000,0,100);
