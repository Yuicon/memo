DROP TABLE IF EXISTS yuicon.record;

CREATE TABLE yuicon.record (
  `id` INT NOT NULL,
  `uid` INT NOT NULL,
  `source` VARCHAR(255) NOT NULL,
  `delete` boolean default false,
  `createTime` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `source_UNIQUE` (`source` ASC));

DROP TABLE IF EXISTS yuicon.item;

CREATE TABLE yuicon.item (
  `id` INT NOT NULL,
  `recordId` INT NOT NULL,
  `sequence` INT default 0,
  `label` VARCHAR(255) NOT NULL,
  `value` VARCHAR(255) NOT NULL,
  `delete` boolean default false,
  PRIMARY KEY (`id`));