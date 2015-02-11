var express = require('express');
var http = require('http');
var fs = require('fs');

var dblogin = fs.readFileSync("prv/dbpw", { "encoding" : "utf-8" } ).split(',');
var dbu = dblogin[0];
var dbp = dblogin[1];
