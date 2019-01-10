DROP TABLE IF EXISTS yuicon.record;

CREATE TABLE yuicon.record (
  `id` INT NOT NULL AUTO_INCREMENT,
  `uid` INT NOT NULL,
  `source` VARCHAR(255) NOT NULL,
  `isDelete` boolean default false,
  `createTime` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `source_UNIQUE` (`source` ASC)
) ENGINE=INNODB DEFAULT CHARSET=UTF8 AUTO_INCREMENT=1;

DROP TABLE IF EXISTS yuicon.item;

CREATE TABLE yuicon.item (
  `id` INT NOT NULL AUTO_INCREMENT,
  `recordId` INT NOT NULL,
  `sequence` INT DEFAULT 0,
  `label` VARCHAR(255) NOT NULL,
  `value` VARCHAR(255) NOT NULL,
  `isDelete` BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (`id`)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8 AUTO_INCREMENT=1;
