Tea.context(function () {
	this.dbAddr = this.config.addr;
	this.dbUsername = this.config.username;
	this.dbPassword = this.config.password;
	this.dbName = this.config.dbName;
	this.autoCreate = true;
	this.dbTestResult = {
		"ok": false,
		"isRunning": false,
		"message": ""
	};

	this.testDB = function () {
		this.dbTestResult.ok = false;
		this.dbTestResult.message = "";
		this.dbTestResult.isRunning = true;

		var params = {
			"dbType": this.dbType,
			"addr": this.dbAddr,
			"username": this.dbUsername,
			"password": this.dbPassword,
			"dbName": this.dbName,
			"autoCreate": this.autoCreate ? 1 : 0
		};
		if (this.dbType == "mongo") {
			params = {
				"dbType": this.dbType,
				"addr": this.mongoAddr,
				"authEnabled": this.mongoAuthEnabled ? 1 : 0,
				"username": this.mongoUsername,
				"password": this.mongoPassword,
				"authMechanism": this.mongoAuthMechanism,
				"authMechanismProperties": this.mongoAuthMechanismProperties,
				"dbName": this.mongoDBName
			};
		}
		this.$post(".test")
			.params(params)
			.timeout(10)
			.success(function () {
				this.dbTestResult.ok = true;
			})
			.fail(function (resp) {
				this.dbTestResult.message = resp.message;
				this.dbTestResult.ok = false;
			})
			.error(function () {
				this.dbTestResult.message = "数据库连接超时";
				this.dbTestResult.ok = false;
			})
			.done(function () {
				this.dbTestResult.isRunning = false;
			});
	};

	/**
	 * 保存
	 */
	this.saveSuccess = function () {
		alert("保存成功");
		window.location = "/settings/mysql";
	};

	this.saveFail = function (resp) {
		alert(resp.message);
	};
});