/*
 Navicat Premium Data Transfer

 Source Server         : Mongo
 Source Server Type    : MongoDB
 Source Server Version : 40005
 Source Host           : localhost:27017
 Source Schema         : electrician

 Target Server Type    : MongoDB
 Target Server Version : 40005
 File Encoding         : 65001

 Date: 01/03/2019 17:40:05
*/


// ----------------------------
// Collection structure for categories
// ----------------------------
db.getCollection("categories").drop();
db.createCollection("categories");

// ----------------------------
// Collection structure for contents
// ----------------------------
db.getCollection("contents").drop();
db.createCollection("contents");

// ----------------------------
// Collection structure for data_accounts
// ----------------------------
db.getCollection("data_accounts").drop();
db.createCollection("data_accounts");

// ----------------------------
// Collection structure for identitycounters
// ----------------------------
db.getCollection("identitycounters").drop();
db.createCollection("identitycounters");
