const mongoose = require('mongoose');
require('./corporateCardModel');

const userSchema = new mongoose.Schema({
	// 사용자 이름
	"name": {
		type: String,
		required: true
	},

	// 비밀번호
	"password": {
		type: String,
		required: true
	},

	// 개인 전화번호
	"phone": String,

	// 이메일
	"email": {
		type: String,
		required: true
	},

	// 접속 권한
	"roles": [String],
	
	// 회사명
	"company": String,

	// 부서
	"department": {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    },

	// 팀
	"team": {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },

	// 직책
	"position": {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Position'
    },

	// 직급
	"rank": {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rank'
    },

	// 회사 전화번호
	"officePhones": [String],

	// 업무 전화번호
	"workPhones": [String],

	// 내선 번호
	"extensionNumbers": [String],

	// 직장 주소
	"workplaceAddress": {
		type: {
			street: String,
			city: String,
			state: String,
			zip: String
		}
	},

	// 입사일
	"hireDate": {
		type: String,
		required: true
	},

    // 법인카드
    "corporateCards": [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CorporateCard'
    }],

	// 퇴사일
	"resignationDate": Date,

	// AccessToken & RefreshToken
	"accessToken": {
		type: String,
	},
	
	"refreshToken": {
		type: String,
	}
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;