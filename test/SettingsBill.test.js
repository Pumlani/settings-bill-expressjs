var assert = require('chai').assert;
let SettingsBill = require('../SettingsBill');

describe('The settings-bill function logic', function () {
    it('should calculate the total for two calls and one sms', function () {
        var settingsBill = SettingsBill();

        let settings = {
            smsCost: 5,
            callCost: 2.50,
            warningLevel: 15,
            critical: 20
        };

        settingsBill.setSettings(settings);

        settingsBill.recordAction('call');
        settingsBill.recordAction('call');

        let totals = settingsBill.totals();

        assert.equal(totals.smsTotal, 0);
        assert.equal(totals.callTotal, 5);
        assert.equal(totals.grandTotal, 5);
    });

    it('should calculate the total for three sms', function () {
        var settingsBill = SettingsBill();

        let settings = {
            smsCost: 5,
            callCost: 0,
            warningLevel: 30,
            critical: 40
        };

        settingsBill.setSettings(settings);

        settingsBill.recordAction('sms');
        settingsBill.recordAction('sms');
        settingsBill.recordAction('sms');

        let totals = settingsBill.totals();

        assert.equal(totals.smsTotal, 15.00);
        assert.equal(totals.callTotal, 0);
        assert.equal(totals.grandTotal, 15.00);
    });
    it('should calculate the total for a three calls', function () {
        var settingsBill = SettingsBill();

        let settings = {
            smsCost: 0,
            callCost: 4.00,
            warningLevel: 30,
            critical: 40
        };

        settingsBill.setSettings(settings);

        settingsBill.recordAction('call');
        settingsBill.recordAction('call');
        settingsBill.recordAction('call');

        let totals = settingsBill.totals();

        assert.equal(totals.smsTotal, 0);
        assert.equal(totals.callTotal, 12.00);
        assert.equal(totals.grandTotal, 12.00);
    });

    it('Should only compute bill items until the critical level is reached, the total should not exceed the critical level', function () {
        var settingsBill = SettingsBill();

        let settings = {
            smsCost: 5,
            callCost: 10,
            warningLevel: 15,
            critical: 30
        };

        settingsBill.setSettings(settings);

        settingsBill.recordAction('call');
        settingsBill.recordAction('call');
        assert.equal(false, settingsBill.hasReachedCriticalLevel());

        settingsBill.recordAction('sms');
        settingsBill.recordAction('sms');
        assert.equal(settingsBill.totals().grandTotal, 30);
    });
});
