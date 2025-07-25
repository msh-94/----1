(function () {
  /* ---------------- 0. LocalStorage helper ------------------- */
  const SALE_KEY = 'saleData';
  const PROD_KEY = 'productList';

  // ▶ seed 데이터 (예시): 실제 프로젝트에 맞게 교체/추가하세요
  //   - 날짜키 규칙 : dYYMMDD  (ex. 2024‑01‑15 → d240115)
  //   - pno : product number / psell : 판매량
  const seedSale = {
    "d240101": [],
    "d240102": [
        {
            "pno": 12,
            "psell": 2
        },
        {
            "pno": 30,
            "psell": 8
        },
        {
            "pno": 45,
            "psell": 10
        },
        {
            "pno": 43,
            "psell": 7
        },
        {
            "pno": 27,
            "psell": 19
        }
    ],
    "d240103": [],
    "d240104": [
        {
            "pno": 23,
            "psell": 9
        },
        {
            "pno": 13,
            "psell": 5
        },
        {
            "pno": 22,
            "psell": 10
        },
        {
            "pno": 11,
            "psell": 15
        },
        {
            "pno": 30,
            "psell": 2
        }
    ],
    "d240105": [
        {
            "pno": 50,
            "psell": 13
        },
        {
            "pno": 26,
            "psell": 12
        }
    ],
    "d240106": [
        {
            "pno": 19,
            "psell": 10
        },
        {
            "pno": 12,
            "psell": 5
        },
        {
            "pno": 2,
            "psell": 11
        },
        {
            "pno": 16,
            "psell": 17
        }
    ],
    "d240107": [],
    "d240108": [
        {
            "pno": 33,
            "psell": 1
        }
    ],
    "d240109": [],
    "d240110": [
        {
            "pno": 41,
            "psell": 13
        },
        {
            "pno": 2,
            "psell": 16
        }
    ],
    "d240111": [
        {
            "pno": 25,
            "psell": 3
        },
        {
            "pno": 10,
            "psell": 20
        },
        {
            "pno": 23,
            "psell": 9
        },
        {
            "pno": 2,
            "psell": 11
        }
    ],
    "d240112": [
        {
            "pno": 12,
            "psell": 19
        },
        {
            "pno": 47,
            "psell": 6
        }
    ],
    "d240113": [
        {
            "pno": 24,
            "psell": 12
        },
        {
            "pno": 9,
            "psell": 7
        }
    ],
    "d240114": [],
    "d240115": [
        {
            "pno": 38,
            "psell": 5
        },
        {
            "pno": 22,
            "psell": 16
        },
        {
            "pno": 4,
            "psell": 11
        }
    ],
    "d240116": [
        {
            "pno": 22,
            "psell": 6
        }
    ],
    "d240117": [
        {
            "pno": 31,
            "psell": 18
        },
        {
            "pno": 46,
            "psell": 20
        },
        {
            "pno": 42,
            "psell": 9
        },
        {
            "pno": 15,
            "psell": 18
        }
    ],
    "d240118": [
        {
            "pno": 31,
            "psell": 16
        },
        {
            "pno": 5,
            "psell": 3
        }
    ],
    "d240119": [
        {
            "pno": 41,
            "psell": 12
        },
        {
            "pno": 31,
            "psell": 14
        }
    ],
    "d240120": [
        {
            "pno": 34,
            "psell": 13
        }
    ],
    "d240121": [
        {
            "pno": 27,
            "psell": 15
        },
        {
            "pno": 26,
            "psell": 12
        },
        {
            "pno": 3,
            "psell": 14
        },
        {
            "pno": 5,
            "psell": 15
        }
    ],
    "d240122": [
        {
            "pno": 38,
            "psell": 17
        },
        {
            "pno": 31,
            "psell": 17
        },
        {
            "pno": 40,
            "psell": 20
        }
    ],
    "d240123": [
        {
            "pno": 24,
            "psell": 11
        },
        {
            "pno": 13,
            "psell": 17
        },
        {
            "pno": 2,
            "psell": 3
        },
        {
            "pno": 14,
            "psell": 12
        },
        {
            "pno": 31,
            "psell": 16
        }
    ],
    "d240124": [
        {
            "pno": 36,
            "psell": 10
        },
        {
            "pno": 1,
            "psell": 19
        }
    ],
    "d240125": [
        {
            "pno": 2,
            "psell": 17
        },
        {
            "pno": 48,
            "psell": 8
        },
        {
            "pno": 33,
            "psell": 15
        },
        {
            "pno": 18,
            "psell": 15
        }
    ],
    "d240126": [
        {
            "pno": 40,
            "psell": 18
        }
    ],
    "d240127": [
        {
            "pno": 3,
            "psell": 11
        },
        {
            "pno": 4,
            "psell": 5
        },
        {
            "pno": 25,
            "psell": 2
        }
    ],
    "d240128": [
        {
            "pno": 30,
            "psell": 13
        }
    ],
    "d240129": [
        {
            "pno": 43,
            "psell": 20
        },
        {
            "pno": 44,
            "psell": 7
        }
    ],
    "d240130": [
        {
            "pno": 8,
            "psell": 7
        }
    ],
    "d240131": [
        {
            "pno": 12,
            "psell": 15
        }
    ],
    "d240201": [
        {
            "pno": 23,
            "psell": 4
        }
    ],
    "d240202": [
        {
            "pno": 21,
            "psell": 1
        },
        {
            "pno": 38,
            "psell": 17
        }
    ],
    "d240203": [
        {
            "pno": 8,
            "psell": 7
        },
        {
            "pno": 4,
            "psell": 9
        },
        {
            "pno": 29,
            "psell": 2
        }
    ],
    "d240204": [
        {
            "pno": 9,
            "psell": 18
        },
        {
            "pno": 2,
            "psell": 20
        },
        {
            "pno": 1,
            "psell": 14
        }
    ],
    "d240205": [
        {
            "pno": 3,
            "psell": 18
        },
        {
            "pno": 37,
            "psell": 20
        },
        {
            "pno": 7,
            "psell": 5
        }
    ],
    "d240206": [
        {
            "pno": 20,
            "psell": 8
        },
        {
            "pno": 38,
            "psell": 9
        },
        {
            "pno": 34,
            "psell": 7
        },
        {
            "pno": 11,
            "psell": 19
        },
        {
            "pno": 26,
            "psell": 9
        }
    ],
    "d240207": [
        {
            "pno": 17,
            "psell": 20
        },
        {
            "pno": 25,
            "psell": 16
        }
    ],
    "d240208": [
        {
            "pno": 25,
            "psell": 17
        },
        {
            "pno": 11,
            "psell": 8
        },
        {
            "pno": 1,
            "psell": 8
        }
    ],
    "d240209": [
        {
            "pno": 3,
            "psell": 8
        },
        {
            "pno": 10,
            "psell": 16
        },
        {
            "pno": 41,
            "psell": 15
        },
        {
            "pno": 47,
            "psell": 20
        }
    ],
    "d240210": [],
    "d240211": [
        {
            "pno": 16,
            "psell": 5
        },
        {
            "pno": 40,
            "psell": 19
        },
        {
            "pno": 15,
            "psell": 17
        }
    ],
    "d240212": [],
    "d240213": [],
    "d240214": [],
    "d240215": [
        {
            "pno": 4,
            "psell": 14
        },
        {
            "pno": 20,
            "psell": 3
        },
        {
            "pno": 37,
            "psell": 7
        },
        {
            "pno": 32,
            "psell": 9
        },
        {
            "pno": 24,
            "psell": 6
        }
    ],
    "d240216": [
        {
            "pno": 12,
            "psell": 10
        },
        {
            "pno": 15,
            "psell": 17
        },
        {
            "pno": 25,
            "psell": 11
        }
    ],
    "d240217": [
        {
            "pno": 30,
            "psell": 3
        },
        {
            "pno": 44,
            "psell": 15
        },
        {
            "pno": 49,
            "psell": 9
        },
        {
            "pno": 24,
            "psell": 19
        },
        {
            "pno": 37,
            "psell": 7
        }
    ],
    "d240218": [
        {
            "pno": 26,
            "psell": 4
        },
        {
            "pno": 13,
            "psell": 6
        },
        {
            "pno": 34,
            "psell": 4
        },
        {
            "pno": 17,
            "psell": 6
        }
    ],
    "d240219": [],
    "d240220": [
        {
            "pno": 11,
            "psell": 16
        },
        {
            "pno": 39,
            "psell": 4
        },
        {
            "pno": 24,
            "psell": 7
        }
    ],
    "d240221": [
        {
            "pno": 34,
            "psell": 15
        },
        {
            "pno": 9,
            "psell": 10
        },
        {
            "pno": 22,
            "psell": 9
        }
    ],
    "d240222": [
        {
            "pno": 17,
            "psell": 3
        },
        {
            "pno": 7,
            "psell": 8
        },
        {
            "pno": 40,
            "psell": 4
        },
        {
            "pno": 8,
            "psell": 5
        }
    ],
    "d240223": [
        {
            "pno": 41,
            "psell": 7
        },
        {
            "pno": 45,
            "psell": 17
        },
        {
            "pno": 29,
            "psell": 19
        },
        {
            "pno": 22,
            "psell": 3
        },
        {
            "pno": 3,
            "psell": 17
        }
    ],
    "d240224": [
        {
            "pno": 45,
            "psell": 10
        }
    ],
    "d240225": [
        {
            "pno": 23,
            "psell": 19
        },
        {
            "pno": 11,
            "psell": 18
        },
        {
            "pno": 42,
            "psell": 6
        },
        {
            "pno": 26,
            "psell": 15
        }
    ],
    "d240226": [
        {
            "pno": 36,
            "psell": 12
        },
        {
            "pno": 28,
            "psell": 20
        },
        {
            "pno": 31,
            "psell": 2
        },
        {
            "pno": 44,
            "psell": 14
        },
        {
            "pno": 45,
            "psell": 9
        }
    ],
    "d240227": [
        {
            "pno": 16,
            "psell": 14
        },
        {
            "pno": 50,
            "psell": 3
        }
    ],
    "d240228": [
        {
            "pno": 41,
            "psell": 1
        }
    ],
    "d240229": [
        {
            "pno": 17,
            "psell": 13
        },
        {
            "pno": 43,
            "psell": 14
        },
        {
            "pno": 8,
            "psell": 9
        },
        {
            "pno": 25,
            "psell": 16
        }
    ],
    "d240301": [
        {
            "pno": 36,
            "psell": 6
        },
        {
            "pno": 19,
            "psell": 5
        },
        {
            "pno": 15,
            "psell": 3
        },
        {
            "pno": 14,
            "psell": 14
        },
        {
            "pno": 13,
            "psell": 10
        }
    ],
    "d240302": [],
    "d240303": [
        {
            "pno": 24,
            "psell": 10
        },
        {
            "pno": 20,
            "psell": 14
        }
    ],
    "d240304": [
        {
            "pno": 30,
            "psell": 4
        },
        {
            "pno": 9,
            "psell": 11
        },
        {
            "pno": 38,
            "psell": 9
        },
        {
            "pno": 15,
            "psell": 18
        },
        {
            "pno": 1,
            "psell": 6
        }
    ],
    "d240305": [],
    "d240306": [
        {
            "pno": 27,
            "psell": 2
        },
        {
            "pno": 1,
            "psell": 7
        },
        {
            "pno": 6,
            "psell": 4
        },
        {
            "pno": 32,
            "psell": 20
        }
    ],
    "d240307": [
        {
            "pno": 38,
            "psell": 20
        }
    ],
    "d240308": [
        {
            "pno": 44,
            "psell": 4
        }
    ],
    "d240309": [],
    "d240310": [
        {
            "pno": 31,
            "psell": 10
        }
    ],
    "d240311": [
        {
            "pno": 26,
            "psell": 16
        },
        {
            "pno": 8,
            "psell": 16
        },
        {
            "pno": 29,
            "psell": 16
        }
    ],
    "d240312": [
        {
            "pno": 13,
            "psell": 17
        },
        {
            "pno": 7,
            "psell": 16
        },
        {
            "pno": 46,
            "psell": 6
        }
    ],
    "d240313": [],
    "d240314": [
        {
            "pno": 25,
            "psell": 12
        },
        {
            "pno": 43,
            "psell": 10
        },
        {
            "pno": 13,
            "psell": 20
        },
        {
            "pno": 44,
            "psell": 1
        },
        {
            "pno": 21,
            "psell": 10
        }
    ],
    "d240315": [],
    "d240316": [
        {
            "pno": 46,
            "psell": 3
        },
        {
            "pno": 29,
            "psell": 13
        },
        {
            "pno": 25,
            "psell": 9
        },
        {
            "pno": 48,
            "psell": 6
        }
    ],
    "d240317": [],
    "d240318": [
        {
            "pno": 1,
            "psell": 1
        },
        {
            "pno": 17,
            "psell": 7
        }
    ],
    "d240319": [],
    "d240320": [
        {
            "pno": 25,
            "psell": 13
        },
        {
            "pno": 22,
            "psell": 9
        }
    ],
    "d240321": [
        {
            "pno": 25,
            "psell": 9
        },
        {
            "pno": 38,
            "psell": 9
        },
        {
            "pno": 29,
            "psell": 8
        },
        {
            "pno": 15,
            "psell": 2
        }
    ],
    "d240322": [
        {
            "pno": 15,
            "psell": 16
        },
        {
            "pno": 45,
            "psell": 15
        },
        {
            "pno": 1,
            "psell": 13
        },
        {
            "pno": 23,
            "psell": 6
        }
    ],
    "d240323": [],
    "d240324": [
        {
            "pno": 5,
            "psell": 20
        },
        {
            "pno": 20,
            "psell": 5
        },
        {
            "pno": 22,
            "psell": 12
        },
        {
            "pno": 45,
            "psell": 9
        },
        {
            "pno": 34,
            "psell": 4
        }
    ],
    "d240325": [
        {
            "pno": 4,
            "psell": 11
        },
        {
            "pno": 15,
            "psell": 9
        }
    ],
    "d240326": [],
    "d240327": [
        {
            "pno": 10,
            "psell": 18
        },
        {
            "pno": 48,
            "psell": 1
        },
        {
            "pno": 49,
            "psell": 7
        }
    ],
    "d240328": [
        {
            "pno": 27,
            "psell": 20
        },
        {
            "pno": 3,
            "psell": 4
        },
        {
            "pno": 18,
            "psell": 17
        }
    ],
    "d240329": [
        {
            "pno": 6,
            "psell": 13
        },
        {
            "pno": 18,
            "psell": 2
        },
        {
            "pno": 17,
            "psell": 19
        }
    ],
    "d240330": [],
    "d240331": [
        {
            "pno": 17,
            "psell": 9
        },
        {
            "pno": 6,
            "psell": 18
        },
        {
            "pno": 36,
            "psell": 10
        },
        {
            "pno": 5,
            "psell": 19
        }
    ],
    "d240401": [
        {
            "pno": 50,
            "psell": 14
        },
        {
            "pno": 20,
            "psell": 20
        },
        {
            "pno": 8,
            "psell": 1
        },
        {
            "pno": 18,
            "psell": 6
        },
        {
            "pno": 7,
            "psell": 15
        }
    ],
    "d240402": [
        {
            "pno": 6,
            "psell": 5
        },
        {
            "pno": 32,
            "psell": 5
        }
    ],
    "d240403": [
        {
            "pno": 14,
            "psell": 18
        },
        {
            "pno": 26,
            "psell": 8
        },
        {
            "pno": 20,
            "psell": 11
        }
    ],
    "d240404": [
        {
            "pno": 50,
            "psell": 13
        },
        {
            "pno": 14,
            "psell": 5
        },
        {
            "pno": 9,
            "psell": 11
        }
    ],
    "d240405": [
        {
            "pno": 46,
            "psell": 10
        },
        {
            "pno": 1,
            "psell": 12
        }
    ],
    "d240406": [
        {
            "pno": 36,
            "psell": 1
        },
        {
            "pno": 44,
            "psell": 1
        },
        {
            "pno": 16,
            "psell": 5
        },
        {
            "pno": 19,
            "psell": 8
        }
    ],
    "d240407": [
        {
            "pno": 31,
            "psell": 17
        },
        {
            "pno": 6,
            "psell": 15
        },
        {
            "pno": 41,
            "psell": 7
        },
        {
            "pno": 44,
            "psell": 3
        }
    ],
    "d240408": [
        {
            "pno": 8,
            "psell": 3
        },
        {
            "pno": 40,
            "psell": 13
        },
        {
            "pno": 39,
            "psell": 17
        }
    ],
    "d240409": [],
    "d240410": [],
    "d240411": [
        {
            "pno": 34,
            "psell": 8
        }
    ],
    "d240412": [
        {
            "pno": 28,
            "psell": 19
        },
        {
            "pno": 16,
            "psell": 4
        },
        {
            "pno": 19,
            "psell": 12
        },
        {
            "pno": 14,
            "psell": 3
        }
    ],
    "d240413": [
        {
            "pno": 37,
            "psell": 6
        },
        {
            "pno": 42,
            "psell": 15
        }
    ],
    "d240414": [
        {
            "pno": 25,
            "psell": 3
        },
        {
            "pno": 16,
            "psell": 11
        },
        {
            "pno": 49,
            "psell": 18
        }
    ],
    "d240415": [
        {
            "pno": 43,
            "psell": 14
        },
        {
            "pno": 11,
            "psell": 4
        }
    ],
    "d240416": [],
    "d240417": [],
    "d240418": [
        {
            "pno": 3,
            "psell": 13
        },
        {
            "pno": 47,
            "psell": 5
        },
        {
            "pno": 8,
            "psell": 9
        }
    ],
    "d240419": [
        {
            "pno": 31,
            "psell": 4
        }
    ],
    "d240420": [
        {
            "pno": 47,
            "psell": 16
        },
        {
            "pno": 15,
            "psell": 1
        }
    ],
    "d240421": [
        {
            "pno": 49,
            "psell": 15
        },
        {
            "pno": 33,
            "psell": 1
        },
        {
            "pno": 9,
            "psell": 3
        }
    ],
    "d240422": [],
    "d240423": [],
    "d240424": [
        {
            "pno": 16,
            "psell": 16
        },
        {
            "pno": 24,
            "psell": 17
        },
        {
            "pno": 41,
            "psell": 10
        },
        {
            "pno": 27,
            "psell": 1
        },
        {
            "pno": 22,
            "psell": 2
        }
    ],
    "d240425": [
        {
            "pno": 39,
            "psell": 8
        },
        {
            "pno": 30,
            "psell": 7
        },
        {
            "pno": 33,
            "psell": 2
        },
        {
            "pno": 28,
            "psell": 7
        },
        {
            "pno": 19,
            "psell": 5
        }
    ],
    "d240426": [],
    "d240427": [
        {
            "pno": 45,
            "psell": 15
        },
        {
            "pno": 10,
            "psell": 15
        }
    ],
    "d240428": [],
    "d240429": [
        {
            "pno": 46,
            "psell": 2
        },
        {
            "pno": 29,
            "psell": 12
        }
    ],
    "d240430": [
        {
            "pno": 22,
            "psell": 7
        },
        {
            "pno": 43,
            "psell": 15
        }
    ],
    "d240501": [
        {
            "pno": 7,
            "psell": 1
        }
    ],
    "d240502": [
        {
            "pno": 21,
            "psell": 6
        },
        {
            "pno": 7,
            "psell": 20
        }
    ],
    "d240503": [],
    "d240504": [
        {
            "pno": 44,
            "psell": 8
        },
        {
            "pno": 23,
            "psell": 19
        },
        {
            "pno": 1,
            "psell": 4
        },
        {
            "pno": 42,
            "psell": 17
        }
    ],
    "d240505": [],
    "d240506": [
        {
            "pno": 12,
            "psell": 8
        },
        {
            "pno": 40,
            "psell": 9
        },
        {
            "pno": 10,
            "psell": 16
        },
        {
            "pno": 4,
            "psell": 13
        },
        {
            "pno": 31,
            "psell": 9
        }
    ],
    "d240507": [
        {
            "pno": 35,
            "psell": 5
        },
        {
            "pno": 42,
            "psell": 16
        },
        {
            "pno": 46,
            "psell": 20
        }
    ],
    "d240508": [
        {
            "pno": 32,
            "psell": 15
        },
        {
            "pno": 50,
            "psell": 8
        },
        {
            "pno": 48,
            "psell": 1
        },
        {
            "pno": 7,
            "psell": 9
        }
    ],
    "d240509": [],
    "d240510": [
        {
            "pno": 23,
            "psell": 11
        },
        {
            "pno": 42,
            "psell": 1
        },
        {
            "pno": 17,
            "psell": 5
        }
    ],
    "d240511": [
        {
            "pno": 25,
            "psell": 17
        }
    ],
    "d240512": [
        {
            "pno": 8,
            "psell": 16
        },
        {
            "pno": 15,
            "psell": 1
        },
        {
            "pno": 42,
            "psell": 3
        },
        {
            "pno": 28,
            "psell": 12
        }
    ],
    "d240513": [
        {
            "pno": 48,
            "psell": 4
        },
        {
            "pno": 13,
            "psell": 17
        },
        {
            "pno": 36,
            "psell": 2
        }
    ],
    "d240514": [
        {
            "pno": 10,
            "psell": 7
        },
        {
            "pno": 44,
            "psell": 6
        },
        {
            "pno": 12,
            "psell": 20
        },
        {
            "pno": 4,
            "psell": 14
        }
    ],
    "d240515": [],
    "d240516": [
        {
            "pno": 6,
            "psell": 9
        }
    ],
    "d240517": [
        {
            "pno": 44,
            "psell": 5
        }
    ],
    "d240518": [
        {
            "pno": 25,
            "psell": 16
        },
        {
            "pno": 6,
            "psell": 12
        },
        {
            "pno": 21,
            "psell": 13
        }
    ],
    "d240519": [],
    "d240520": [
        {
            "pno": 28,
            "psell": 20
        },
        {
            "pno": 24,
            "psell": 16
        },
        {
            "pno": 5,
            "psell": 11
        },
        {
            "pno": 14,
            "psell": 18
        }
    ],
    "d240521": [
        {
            "pno": 12,
            "psell": 4
        },
        {
            "pno": 2,
            "psell": 17
        }
    ],
    "d240522": [
        {
            "pno": 8,
            "psell": 18
        },
        {
            "pno": 47,
            "psell": 9
        }
    ],
    "d240523": [],
    "d240524": [
        {
            "pno": 30,
            "psell": 6
        },
        {
            "pno": 24,
            "psell": 2
        },
        {
            "pno": 8,
            "psell": 13
        }
    ],
    "d240525": [],
    "d240526": [
        {
            "pno": 27,
            "psell": 18
        },
        {
            "pno": 3,
            "psell": 8
        },
        {
            "pno": 35,
            "psell": 15
        }
    ],
    "d240527": [
        {
            "pno": 1,
            "psell": 17
        },
        {
            "pno": 38,
            "psell": 11
        },
        {
            "pno": 29,
            "psell": 9
        },
        {
            "pno": 32,
            "psell": 20
        }
    ],
    "d240528": [
        {
            "pno": 32,
            "psell": 12
        },
        {
            "pno": 16,
            "psell": 13
        }
    ],
    "d240529": [
        {
            "pno": 34,
            "psell": 9
        }
    ],
    "d240530": [
        {
            "pno": 12,
            "psell": 1
        },
        {
            "pno": 38,
            "psell": 20
        },
        {
            "pno": 15,
            "psell": 19
        }
    ],
    "d240531": [
        {
            "pno": 19,
            "psell": 20
        }
    ],
    "d240601": [
        {
            "pno": 50,
            "psell": 10
        },
        {
            "pno": 38,
            "psell": 10
        },
        {
            "pno": 49,
            "psell": 20
        }
    ],
    "d240602": [
        {
            "pno": 13,
            "psell": 4
        },
        {
            "pno": 27,
            "psell": 10
        },
        {
            "pno": 34,
            "psell": 20
        },
        {
            "pno": 41,
            "psell": 5
        },
        {
            "pno": 42,
            "psell": 20
        }
    ],
    "d240603": [
        {
            "pno": 24,
            "psell": 5
        },
        {
            "pno": 15,
            "psell": 6
        },
        {
            "pno": 29,
            "psell": 2
        },
        {
            "pno": 38,
            "psell": 11
        }
    ],
    "d240604": [
        {
            "pno": 44,
            "psell": 20
        },
        {
            "pno": 27,
            "psell": 17
        },
        {
            "pno": 10,
            "psell": 10
        }
    ],
    "d240605": [
        {
            "pno": 17,
            "psell": 9
        },
        {
            "pno": 15,
            "psell": 2
        },
        {
            "pno": 44,
            "psell": 18
        }
    ],
    "d240606": [
        {
            "pno": 17,
            "psell": 19
        },
        {
            "pno": 26,
            "psell": 17
        },
        {
            "pno": 38,
            "psell": 11
        }
    ],
    "d240607": [
        {
            "pno": 26,
            "psell": 20
        },
        {
            "pno": 20,
            "psell": 2
        }
    ],
    "d240608": [
        {
            "pno": 6,
            "psell": 3
        },
        {
            "pno": 13,
            "psell": 13
        },
        {
            "pno": 37,
            "psell": 5
        }
    ],
    "d240609": [
        {
            "pno": 9,
            "psell": 8
        },
        {
            "pno": 35,
            "psell": 8
        }
    ],
    "d240610": [
        {
            "pno": 20,
            "psell": 9
        }
    ],
    "d240611": [
        {
            "pno": 21,
            "psell": 6
        }
    ],
    "d240612": [
        {
            "pno": 35,
            "psell": 12
        },
        {
            "pno": 50,
            "psell": 3
        }
    ],
    "d240613": [],
    "d240614": [
        {
            "pno": 6,
            "psell": 20
        },
        {
            "pno": 20,
            "psell": 9
        }
    ],
    "d240615": [],
    "d240616": [
        {
            "pno": 22,
            "psell": 16
        }
    ],
    "d240617": [],
    "d240618": [
        {
            "pno": 11,
            "psell": 6
        },
        {
            "pno": 13,
            "psell": 18
        }
    ],
    "d240619": [
        {
            "pno": 1,
            "psell": 20
        },
        {
            "pno": 48,
            "psell": 5
        },
        {
            "pno": 43,
            "psell": 15
        },
        {
            "pno": 4,
            "psell": 9
        },
        {
            "pno": 16,
            "psell": 4
        }
    ],
    "d240620": [],
    "d240621": [
        {
            "pno": 44,
            "psell": 13
        },
        {
            "pno": 22,
            "psell": 3
        },
        {
            "pno": 15,
            "psell": 19
        },
        {
            "pno": 17,
            "psell": 5
        }
    ],
    "d240622": [
        {
            "pno": 41,
            "psell": 10
        },
        {
            "pno": 32,
            "psell": 18
        }
    ],
    "d240623": [
        {
            "pno": 42,
            "psell": 9
        },
        {
            "pno": 22,
            "psell": 16
        }
    ],
    "d240624": [],
    "d240625": [
        {
            "pno": 8,
            "psell": 13
        }
    ],
    "d240626": [],
    "d240627": [
        {
            "pno": 41,
            "psell": 1
        },
        {
            "pno": 29,
            "psell": 18
        }
    ],
    "d240628": [
        {
            "pno": 35,
            "psell": 2
        },
        {
            "pno": 17,
            "psell": 17
        },
        {
            "pno": 43,
            "psell": 8
        }
    ],
    "d240629": [
        {
            "pno": 39,
            "psell": 1
        }
    ],
    "d240630": [],
    "d240701": [
        {
            "pno": 26,
            "psell": 11
        },
        {
            "pno": 13,
            "psell": 15
        },
        {
            "pno": 24,
            "psell": 16
        }
    ],
    "d240702": [
        {
            "pno": 9,
            "psell": 16
        }
    ],
    "d240703": [
        {
            "pno": 41,
            "psell": 8
        },
        {
            "pno": 37,
            "psell": 12
        },
        {
            "pno": 6,
            "psell": 18
        },
        {
            "pno": 18,
            "psell": 14
        }
    ],
    "d240704": [],
    "d240705": [
        {
            "pno": 41,
            "psell": 6
        },
        {
            "pno": 48,
            "psell": 16
        },
        {
            "pno": 32,
            "psell": 14
        },
        {
            "pno": 14,
            "psell": 10
        }
    ],
    "d240706": [
        {
            "pno": 25,
            "psell": 2
        }
    ],
    "d240707": [],
    "d240708": [
        {
            "pno": 15,
            "psell": 10
        },
        {
            "pno": 25,
            "psell": 8
        },
        {
            "pno": 31,
            "psell": 4
        }
    ],
    "d240709": [],
    "d240710": [
        {
            "pno": 13,
            "psell": 5
        },
        {
            "pno": 27,
            "psell": 3
        },
        {
            "pno": 16,
            "psell": 14
        },
        {
            "pno": 23,
            "psell": 3
        },
        {
            "pno": 42,
            "psell": 18
        }
    ],
    "d240711": [
        {
            "pno": 7,
            "psell": 19
        },
        {
            "pno": 50,
            "psell": 2
        }
    ],
    "d240712": [
        {
            "pno": 49,
            "psell": 18
        },
        {
            "pno": 18,
            "psell": 4
        },
        {
            "pno": 23,
            "psell": 13
        }
    ],
    "d240713": [
        {
            "pno": 11,
            "psell": 19
        },
        {
            "pno": 1,
            "psell": 2
        },
        {
            "pno": 22,
            "psell": 16
        },
        {
            "pno": 35,
            "psell": 18
        },
        {
            "pno": 41,
            "psell": 6
        }
    ],
    "d240714": [
        {
            "pno": 24,
            "psell": 5
        },
        {
            "pno": 23,
            "psell": 5
        },
        {
            "pno": 21,
            "psell": 17
        },
        {
            "pno": 17,
            "psell": 8
        }
    ],
    "d240715": [
        {
            "pno": 2,
            "psell": 3
        },
        {
            "pno": 19,
            "psell": 20
        },
        {
            "pno": 23,
            "psell": 6
        }
    ],
    "d240716": [
        {
            "pno": 39,
            "psell": 19
        }
    ],
    "d240717": [
        {
            "pno": 42,
            "psell": 8
        },
        {
            "pno": 13,
            "psell": 2
        }
    ],
    "d240718": [
        {
            "pno": 44,
            "psell": 19
        },
        {
            "pno": 35,
            "psell": 6
        },
        {
            "pno": 11,
            "psell": 13
        },
        {
            "pno": 16,
            "psell": 11
        },
        {
            "pno": 46,
            "psell": 8
        }
    ],
    "d240719": [
        {
            "pno": 13,
            "psell": 2
        },
        {
            "pno": 10,
            "psell": 14
        },
        {
            "pno": 36,
            "psell": 13
        }
    ],
    "d240720": [],
    "d240721": [
        {
            "pno": 38,
            "psell": 13
        },
        {
            "pno": 24,
            "psell": 11
        },
        {
            "pno": 30,
            "psell": 19
        },
        {
            "pno": 2,
            "psell": 1
        }
    ],
    "d240722": [],
    "d240723": [
        {
            "pno": 7,
            "psell": 8
        },
        {
            "pno": 45,
            "psell": 20
        }
    ],
    "d240724": [
        {
            "pno": 41,
            "psell": 12
        },
        {
            "pno": 49,
            "psell": 13
        }
    ],
    "d240725": [
        {
            "pno": 38,
            "psell": 12
        },
        {
            "pno": 3,
            "psell": 2
        },
        {
            "pno": 24,
            "psell": 10
        },
        {
            "pno": 44,
            "psell": 1
        }
    ],
    "d240726": [
        {
            "pno": 28,
            "psell": 17
        },
        {
            "pno": 35,
            "psell": 1
        },
        {
            "pno": 27,
            "psell": 13
        },
        {
            "pno": 2,
            "psell": 13
        }
    ],
    "d240727": [
        {
            "pno": 18,
            "psell": 13
        },
        {
            "pno": 37,
            "psell": 6
        }
    ],
    "d240728": [
        {
            "pno": 48,
            "psell": 12
        }
    ],
    "d240729": [
        {
            "pno": 11,
            "psell": 2
        },
        {
            "pno": 13,
            "psell": 12
        },
        {
            "pno": 6,
            "psell": 18
        },
        {
            "pno": 5,
            "psell": 14
        },
        {
            "pno": 23,
            "psell": 15
        }
    ],
    "d240730": [
        {
            "pno": 42,
            "psell": 20
        },
        {
            "pno": 36,
            "psell": 16
        },
        {
            "pno": 48,
            "psell": 6
        },
        {
            "pno": 2,
            "psell": 5
        }
    ],
    "d240731": [
        {
            "pno": 13,
            "psell": 20
        },
        {
            "pno": 45,
            "psell": 1
        },
        {
            "pno": 25,
            "psell": 8
        }
    ],
    "d240801": [
        {
            "pno": 21,
            "psell": 2
        }
    ],
    "d240802": [],
    "d240803": [
        {
            "pno": 21,
            "psell": 15
        },
        {
            "pno": 41,
            "psell": 1
        },
        {
            "pno": 35,
            "psell": 3
        }
    ],
    "d240804": [
        {
            "pno": 19,
            "psell": 20
        }
    ],
    "d240805": [
        {
            "pno": 19,
            "psell": 3
        },
        {
            "pno": 13,
            "psell": 20
        },
        {
            "pno": 31,
            "psell": 15
        },
        {
            "pno": 33,
            "psell": 18
        },
        {
            "pno": 28,
            "psell": 6
        }
    ],
    "d240806": [
        {
            "pno": 18,
            "psell": 12
        },
        {
            "pno": 45,
            "psell": 17
        },
        {
            "pno": 37,
            "psell": 18
        },
        {
            "pno": 29,
            "psell": 6
        },
        {
            "pno": 33,
            "psell": 17
        }
    ],
    "d240807": [
        {
            "pno": 46,
            "psell": 14
        },
        {
            "pno": 50,
            "psell": 18
        }
    ],
    "d240808": [
        {
            "pno": 33,
            "psell": 6
        }
    ],
    "d240809": [
        {
            "pno": 3,
            "psell": 20
        },
        {
            "pno": 50,
            "psell": 13
        },
        {
            "pno": 33,
            "psell": 9
        },
        {
            "pno": 15,
            "psell": 9
        },
        {
            "pno": 28,
            "psell": 5
        }
    ],
    "d240810": [],
    "d240811": [
        {
            "pno": 35,
            "psell": 8
        },
        {
            "pno": 25,
            "psell": 2
        },
        {
            "pno": 1,
            "psell": 7
        }
    ],
    "d240812": [
        {
            "pno": 15,
            "psell": 4
        }
    ],
    "d240813": [
        {
            "pno": 5,
            "psell": 7
        },
        {
            "pno": 41,
            "psell": 4
        },
        {
            "pno": 21,
            "psell": 13
        },
        {
            "pno": 24,
            "psell": 6
        }
    ],
    "d240814": [],
    "d240815": [
        {
            "pno": 25,
            "psell": 13
        }
    ],
    "d240816": [
        {
            "pno": 18,
            "psell": 19
        },
        {
            "pno": 5,
            "psell": 17
        },
        {
            "pno": 20,
            "psell": 2
        }
    ],
    "d240817": [
        {
            "pno": 30,
            "psell": 16
        },
        {
            "pno": 14,
            "psell": 7
        },
        {
            "pno": 25,
            "psell": 14
        },
        {
            "pno": 37,
            "psell": 18
        },
        {
            "pno": 5,
            "psell": 17
        }
    ],
    "d240818": [
        {
            "pno": 13,
            "psell": 6
        },
        {
            "pno": 49,
            "psell": 19
        },
        {
            "pno": 15,
            "psell": 12
        },
        {
            "pno": 38,
            "psell": 5
        },
        {
            "pno": 37,
            "psell": 8
        }
    ],
    "d240819": [],
    "d240820": [
        {
            "pno": 48,
            "psell": 6
        },
        {
            "pno": 3,
            "psell": 20
        },
        {
            "pno": 4,
            "psell": 3
        }
    ],
    "d240821": [
        {
            "pno": 48,
            "psell": 5
        },
        {
            "pno": 8,
            "psell": 5
        },
        {
            "pno": 1,
            "psell": 10
        },
        {
            "pno": 2,
            "psell": 12
        }
    ],
    "d240822": [
        {
            "pno": 14,
            "psell": 13
        },
        {
            "pno": 30,
            "psell": 5
        },
        {
            "pno": 25,
            "psell": 4
        }
    ],
    "d240823": [
        {
            "pno": 49,
            "psell": 11
        }
    ],
    "d240824": [
        {
            "pno": 35,
            "psell": 3
        },
        {
            "pno": 3,
            "psell": 2
        }
    ],
    "d240825": [
        {
            "pno": 35,
            "psell": 9
        },
        {
            "pno": 7,
            "psell": 5
        },
        {
            "pno": 37,
            "psell": 14
        },
        {
            "pno": 28,
            "psell": 3
        }
    ],
    "d240826": [
        {
            "pno": 23,
            "psell": 11
        },
        {
            "pno": 19,
            "psell": 9
        }
    ],
    "d240827": [],
    "d240828": [
        {
            "pno": 36,
            "psell": 17
        },
        {
            "pno": 4,
            "psell": 2
        },
        {
            "pno": 18,
            "psell": 17
        },
        {
            "pno": 10,
            "psell": 6
        },
        {
            "pno": 20,
            "psell": 17
        }
    ],
    "d240829": [
        {
            "pno": 29,
            "psell": 13
        },
        {
            "pno": 14,
            "psell": 8
        },
        {
            "pno": 37,
            "psell": 19
        },
        {
            "pno": 25,
            "psell": 2
        },
        {
            "pno": 39,
            "psell": 2
        }
    ],
    "d240830": [
        {
            "pno": 20,
            "psell": 4
        },
        {
            "pno": 34,
            "psell": 2
        },
        {
            "pno": 46,
            "psell": 17
        },
        {
            "pno": 49,
            "psell": 6
        }
    ],
    "d240831": [
        {
            "pno": 32,
            "psell": 13
        },
        {
            "pno": 1,
            "psell": 1
        },
        {
            "pno": 50,
            "psell": 3
        },
        {
            "pno": 23,
            "psell": 12
        },
        {
            "pno": 44,
            "psell": 17
        }
    ],
    "d240901": [
        {
            "pno": 44,
            "psell": 9
        },
        {
            "pno": 2,
            "psell": 17
        },
        {
            "pno": 8,
            "psell": 4
        },
        {
            "pno": 36,
            "psell": 11
        },
        {
            "pno": 38,
            "psell": 1
        }
    ],
    "d240902": [],
    "d240903": [],
    "d240904": [],
    "d240905": [
        {
            "pno": 19,
            "psell": 12
        },
        {
            "pno": 14,
            "psell": 10
        },
        {
            "pno": 36,
            "psell": 10
        },
        {
            "pno": 29,
            "psell": 14
        }
    ],
    "d240906": [],
    "d240907": [
        {
            "pno": 5,
            "psell": 18
        },
        {
            "pno": 33,
            "psell": 7
        },
        {
            "pno": 38,
            "psell": 8
        },
        {
            "pno": 28,
            "psell": 16
        }
    ],
    "d240908": [],
    "d240909": [],
    "d240910": [],
    "d240911": [
        {
            "pno": 10,
            "psell": 8
        },
        {
            "pno": 26,
            "psell": 2
        },
        {
            "pno": 43,
            "psell": 8
        },
        {
            "pno": 35,
            "psell": 10
        }
    ],
    "d240912": [
        {
            "pno": 23,
            "psell": 19
        }
    ],
    "d240913": [
        {
            "pno": 23,
            "psell": 14
        },
        {
            "pno": 14,
            "psell": 9
        },
        {
            "pno": 41,
            "psell": 19
        },
        {
            "pno": 24,
            "psell": 15
        },
        {
            "pno": 29,
            "psell": 1
        }
    ],
    "d240914": [
        {
            "pno": 8,
            "psell": 2
        },
        {
            "pno": 5,
            "psell": 3
        },
        {
            "pno": 16,
            "psell": 6
        }
    ],
    "d240915": [],
    "d240916": [
        {
            "pno": 45,
            "psell": 15
        },
        {
            "pno": 20,
            "psell": 10
        },
        {
            "pno": 33,
            "psell": 15
        },
        {
            "pno": 30,
            "psell": 9
        },
        {
            "pno": 2,
            "psell": 18
        }
    ],
    "d240917": [
        {
            "pno": 46,
            "psell": 14
        }
    ],
    "d240918": [
        {
            "pno": 47,
            "psell": 12
        },
        {
            "pno": 37,
            "psell": 20
        }
    ],
    "d240919": [
        {
            "pno": 35,
            "psell": 18
        },
        {
            "pno": 9,
            "psell": 17
        },
        {
            "pno": 42,
            "psell": 12
        },
        {
            "pno": 45,
            "psell": 16
        }
    ],
    "d240920": [
        {
            "pno": 32,
            "psell": 4
        },
        {
            "pno": 39,
            "psell": 9
        }
    ],
    "d240921": [
        {
            "pno": 48,
            "psell": 7
        },
        {
            "pno": 29,
            "psell": 9
        },
        {
            "pno": 9,
            "psell": 4
        }
    ],
    "d240922": [
        {
            "pno": 20,
            "psell": 19
        },
        {
            "pno": 5,
            "psell": 1
        }
    ],
    "d240923": [
        {
            "pno": 18,
            "psell": 1
        },
        {
            "pno": 27,
            "psell": 16
        },
        {
            "pno": 10,
            "psell": 14
        }
    ],
    "d240924": [
        {
            "pno": 41,
            "psell": 8
        },
        {
            "pno": 48,
            "psell": 6
        },
        {
            "pno": 46,
            "psell": 11
        }
    ],
    "d240925": [
        {
            "pno": 31,
            "psell": 9
        },
        {
            "pno": 46,
            "psell": 6
        },
        {
            "pno": 25,
            "psell": 14
        }
    ],
    "d240926": [],
    "d240927": [
        {
            "pno": 14,
            "psell": 7
        },
        {
            "pno": 23,
            "psell": 4
        },
        {
            "pno": 8,
            "psell": 3
        }
    ],
    "d240928": [
        {
            "pno": 36,
            "psell": 4
        },
        {
            "pno": 5,
            "psell": 8
        },
        {
            "pno": 1,
            "psell": 16
        }
    ],
    "d240929": [
        {
            "pno": 4,
            "psell": 7
        },
        {
            "pno": 28,
            "psell": 17
        }
    ],
    "d240930": [
        {
            "pno": 5,
            "psell": 16
        },
        {
            "pno": 3,
            "psell": 9
        },
        {
            "pno": 33,
            "psell": 2
        },
        {
            "pno": 19,
            "psell": 8
        },
        {
            "pno": 40,
            "psell": 20
        }
    ],
    "d241001": [
        {
            "pno": 50,
            "psell": 11
        },
        {
            "pno": 30,
            "psell": 6
        },
        {
            "pno": 38,
            "psell": 6
        }
    ],
    "d241002": [
        {
            "pno": 32,
            "psell": 6
        },
        {
            "pno": 40,
            "psell": 2
        },
        {
            "pno": 44,
            "psell": 3
        }
    ],
    "d241003": [
        {
            "pno": 45,
            "psell": 20
        }
    ],
    "d241004": [
        {
            "pno": 10,
            "psell": 14
        },
        {
            "pno": 29,
            "psell": 15
        },
        {
            "pno": 39,
            "psell": 14
        },
        {
            "pno": 24,
            "psell": 13
        },
        {
            "pno": 45,
            "psell": 6
        }
    ],
    "d241005": [
        {
            "pno": 36,
            "psell": 10
        },
        {
            "pno": 38,
            "psell": 11
        }
    ],
    "d241006": [
        {
            "pno": 25,
            "psell": 15
        },
        {
            "pno": 47,
            "psell": 10
        },
        {
            "pno": 6,
            "psell": 12
        },
        {
            "pno": 24,
            "psell": 20
        }
    ],
    "d241007": [
        {
            "pno": 16,
            "psell": 1
        },
        {
            "pno": 47,
            "psell": 9
        },
        {
            "pno": 5,
            "psell": 16
        }
    ],
    "d241008": [
        {
            "pno": 9,
            "psell": 18
        }
    ],
    "d241009": [
        {
            "pno": 3,
            "psell": 3
        },
        {
            "pno": 16,
            "psell": 15
        },
        {
            "pno": 41,
            "psell": 10
        },
        {
            "pno": 36,
            "psell": 15
        },
        {
            "pno": 11,
            "psell": 18
        }
    ],
    "d241010": [
        {
            "pno": 7,
            "psell": 9
        },
        {
            "pno": 13,
            "psell": 9
        },
        {
            "pno": 1,
            "psell": 13
        },
        {
            "pno": 50,
            "psell": 19
        },
        {
            "pno": 29,
            "psell": 20
        }
    ],
    "d241011": [],
    "d241012": [
        {
            "pno": 25,
            "psell": 12
        },
        {
            "pno": 44,
            "psell": 3
        },
        {
            "pno": 3,
            "psell": 20
        }
    ],
    "d241013": [
        {
            "pno": 27,
            "psell": 6
        },
        {
            "pno": 15,
            "psell": 3
        },
        {
            "pno": 49,
            "psell": 10
        },
        {
            "pno": 21,
            "psell": 15
        }
    ],
    "d241014": [],
    "d241015": [],
    "d241016": [
        {
            "pno": 26,
            "psell": 19
        },
        {
            "pno": 47,
            "psell": 1
        },
        {
            "pno": 9,
            "psell": 18
        },
        {
            "pno": 50,
            "psell": 6
        }
    ],
    "d241017": [
        {
            "pno": 41,
            "psell": 1
        }
    ],
    "d241018": [
        {
            "pno": 17,
            "psell": 3
        },
        {
            "pno": 33,
            "psell": 15
        },
        {
            "pno": 13,
            "psell": 10
        }
    ],
    "d241019": [
        {
            "pno": 40,
            "psell": 17
        },
        {
            "pno": 26,
            "psell": 20
        },
        {
            "pno": 5,
            "psell": 1
        },
        {
            "pno": 15,
            "psell": 6
        }
    ],
    "d241020": [],
    "d241021": [
        {
            "pno": 33,
            "psell": 4
        }
    ],
    "d241022": [
        {
            "pno": 36,
            "psell": 16
        },
        {
            "pno": 6,
            "psell": 16
        },
        {
            "pno": 28,
            "psell": 13
        },
        {
            "pno": 45,
            "psell": 5
        },
        {
            "pno": 13,
            "psell": 3
        }
    ],
    "d241023": [
        {
            "pno": 14,
            "psell": 3
        },
        {
            "pno": 2,
            "psell": 13
        },
        {
            "pno": 10,
            "psell": 6
        },
        {
            "pno": 28,
            "psell": 1
        }
    ],
    "d241024": [
        {
            "pno": 1,
            "psell": 3
        },
        {
            "pno": 25,
            "psell": 12
        },
        {
            "pno": 2,
            "psell": 12
        }
    ],
    "d241025": [
        {
            "pno": 31,
            "psell": 17
        },
        {
            "pno": 23,
            "psell": 11
        },
        {
            "pno": 12,
            "psell": 4
        },
        {
            "pno": 17,
            "psell": 13
        }
    ],
    "d241026": [],
    "d241027": [],
    "d241028": [
        {
            "pno": 8,
            "psell": 20
        },
        {
            "pno": 36,
            "psell": 7
        },
        {
            "pno": 12,
            "psell": 19
        }
    ],
    "d241029": [
        {
            "pno": 3,
            "psell": 17
        },
        {
            "pno": 22,
            "psell": 5
        },
        {
            "pno": 28,
            "psell": 17
        }
    ],
    "d241030": [
        {
            "pno": 8,
            "psell": 14
        },
        {
            "pno": 27,
            "psell": 17
        },
        {
            "pno": 37,
            "psell": 10
        },
        {
            "pno": 14,
            "psell": 17
        }
    ],
    "d241031": [],
    "d241101": [
        {
            "pno": 20,
            "psell": 13
        },
        {
            "pno": 29,
            "psell": 13
        },
        {
            "pno": 17,
            "psell": 18
        },
        {
            "pno": 1,
            "psell": 17
        },
        {
            "pno": 30,
            "psell": 4
        }
    ],
    "d241102": [
        {
            "pno": 20,
            "psell": 16
        },
        {
            "pno": 2,
            "psell": 20
        },
        {
            "pno": 10,
            "psell": 17
        },
        {
            "pno": 6,
            "psell": 13
        },
        {
            "pno": 18,
            "psell": 14
        }
    ],
    "d241103": [
        {
            "pno": 11,
            "psell": 17
        },
        {
            "pno": 10,
            "psell": 2
        },
        {
            "pno": 31,
            "psell": 2
        }
    ],
    "d241104": [
        {
            "pno": 36,
            "psell": 4
        },
        {
            "pno": 44,
            "psell": 17
        }
    ],
    "d241105": [
        {
            "pno": 34,
            "psell": 19
        },
        {
            "pno": 13,
            "psell": 13
        },
        {
            "pno": 42,
            "psell": 4
        },
        {
            "pno": 1,
            "psell": 12
        }
    ],
    "d241106": [
        {
            "pno": 29,
            "psell": 8
        },
        {
            "pno": 35,
            "psell": 9
        },
        {
            "pno": 32,
            "psell": 1
        },
        {
            "pno": 13,
            "psell": 18
        }
    ],
    "d241107": [
        {
            "pno": 3,
            "psell": 7
        },
        {
            "pno": 14,
            "psell": 5
        }
    ],
    "d241108": [
        {
            "pno": 20,
            "psell": 4
        },
        {
            "pno": 18,
            "psell": 17
        },
        {
            "pno": 33,
            "psell": 18
        }
    ],
    "d241109": [
        {
            "pno": 30,
            "psell": 15
        },
        {
            "pno": 9,
            "psell": 18
        },
        {
            "pno": 11,
            "psell": 8
        },
        {
            "pno": 50,
            "psell": 12
        },
        {
            "pno": 48,
            "psell": 8
        }
    ],
    "d241110": [
        {
            "pno": 34,
            "psell": 2
        }
    ],
    "d241111": [
        {
            "pno": 16,
            "psell": 20
        },
        {
            "pno": 44,
            "psell": 2
        },
        {
            "pno": 13,
            "psell": 3
        }
    ],
    "d241112": [
        {
            "pno": 20,
            "psell": 8
        },
        {
            "pno": 46,
            "psell": 17
        },
        {
            "pno": 44,
            "psell": 15
        },
        {
            "pno": 43,
            "psell": 11
        }
    ],
    "d241113": [
        {
            "pno": 36,
            "psell": 4
        },
        {
            "pno": 49,
            "psell": 7
        },
        {
            "pno": 34,
            "psell": 6
        },
        {
            "pno": 35,
            "psell": 8
        },
        {
            "pno": 40,
            "psell": 8
        }
    ],
    "d241114": [
        {
            "pno": 50,
            "psell": 1
        }
    ],
    "d241115": [
        {
            "pno": 41,
            "psell": 18
        },
        {
            "pno": 19,
            "psell": 5
        },
        {
            "pno": 10,
            "psell": 2
        },
        {
            "pno": 30,
            "psell": 19
        }
    ],
    "d241116": [],
    "d241117": [
        {
            "pno": 7,
            "psell": 12
        },
        {
            "pno": 45,
            "psell": 1
        },
        {
            "pno": 50,
            "psell": 1
        }
    ],
    "d241118": [
        {
            "pno": 35,
            "psell": 4
        }
    ],
    "d241119": [
        {
            "pno": 32,
            "psell": 15
        },
        {
            "pno": 24,
            "psell": 14
        },
        {
            "pno": 49,
            "psell": 1
        }
    ],
    "d241120": [
        {
            "pno": 46,
            "psell": 1
        },
        {
            "pno": 42,
            "psell": 18
        },
        {
            "pno": 43,
            "psell": 12
        },
        {
            "pno": 32,
            "psell": 13
        }
    ],
    "d241121": [
        {
            "pno": 48,
            "psell": 16
        },
        {
            "pno": 12,
            "psell": 1
        },
        {
            "pno": 20,
            "psell": 17
        }
    ],
    "d241122": [
        {
            "pno": 3,
            "psell": 15
        },
        {
            "pno": 25,
            "psell": 5
        }
    ],
    "d241123": [
        {
            "pno": 38,
            "psell": 12
        },
        {
            "pno": 22,
            "psell": 6
        },
        {
            "pno": 37,
            "psell": 12
        },
        {
            "pno": 13,
            "psell": 15
        },
        {
            "pno": 41,
            "psell": 8
        }
    ],
    "d241124": [],
    "d241125": [
        {
            "pno": 23,
            "psell": 7
        },
        {
            "pno": 7,
            "psell": 16
        },
        {
            "pno": 13,
            "psell": 11
        }
    ],
    "d241126": [],
    "d241127": [
        {
            "pno": 25,
            "psell": 2
        },
        {
            "pno": 23,
            "psell": 3
        },
        {
            "pno": 37,
            "psell": 7
        },
        {
            "pno": 21,
            "psell": 8
        },
        {
            "pno": 44,
            "psell": 19
        }
    ],
    "d241128": [],
    "d241129": [],
    "d241130": [
        {
            "pno": 14,
            "psell": 1
        },
        {
            "pno": 44,
            "psell": 18
        },
        {
            "pno": 13,
            "psell": 9
        },
        {
            "pno": 47,
            "psell": 11
        },
        {
            "pno": 28,
            "psell": 18
        }
    ],
    "d241201": [
        {
            "pno": 36,
            "psell": 16
        },
        {
            "pno": 28,
            "psell": 16
        },
        {
            "pno": 31,
            "psell": 9
        }
    ],
    "d241202": [
        {
            "pno": 18,
            "psell": 1
        }
    ],
    "d241203": [
        {
            "pno": 12,
            "psell": 2
        },
        {
            "pno": 23,
            "psell": 16
        },
        {
            "pno": 1,
            "psell": 11
        }
    ],
    "d241204": [],
    "d241205": [
        {
            "pno": 45,
            "psell": 4
        },
        {
            "pno": 7,
            "psell": 11
        },
        {
            "pno": 49,
            "psell": 7
        },
        {
            "pno": 40,
            "psell": 13
        }
    ],
    "d241206": [
        {
            "pno": 33,
            "psell": 4
        },
        {
            "pno": 41,
            "psell": 5
        },
        {
            "pno": 29,
            "psell": 12
        },
        {
            "pno": 22,
            "psell": 16
        }
    ],
    "d241207": [
        {
            "pno": 11,
            "psell": 15
        },
        {
            "pno": 23,
            "psell": 13
        },
        {
            "pno": 10,
            "psell": 8
        }
    ],
    "d241208": [
        {
            "pno": 24,
            "psell": 9
        },
        {
            "pno": 29,
            "psell": 8
        },
        {
            "pno": 9,
            "psell": 19
        },
        {
            "pno": 1,
            "psell": 14
        },
        {
            "pno": 11,
            "psell": 17
        }
    ],
    "d241209": [
        {
            "pno": 44,
            "psell": 13
        }
    ],
    "d241210": [
        {
            "pno": 17,
            "psell": 13
        },
        {
            "pno": 34,
            "psell": 15
        },
        {
            "pno": 21,
            "psell": 5
        },
        {
            "pno": 15,
            "psell": 19
        },
        {
            "pno": 12,
            "psell": 6
        }
    ],
    "d241211": [
        {
            "pno": 11,
            "psell": 7
        },
        {
            "pno": 23,
            "psell": 19
        },
        {
            "pno": 35,
            "psell": 20
        },
        {
            "pno": 38,
            "psell": 13
        }
    ],
    "d241212": [],
    "d241213": [],
    "d241214": [],
    "d241215": [
        {
            "pno": 43,
            "psell": 3
        },
        {
            "pno": 45,
            "psell": 12
        }
    ],
    "d241216": [
        {
            "pno": 31,
            "psell": 14
        }
    ],
    "d241217": [],
    "d241218": [
        {
            "pno": 38,
            "psell": 8
        },
        {
            "pno": 7,
            "psell": 7
        }
    ],
    "d241219": [
        {
            "pno": 33,
            "psell": 7
        },
        {
            "pno": 26,
            "psell": 12
        },
        {
            "pno": 39,
            "psell": 4
        },
        {
            "pno": 22,
            "psell": 1
        }
    ],
    "d241220": [
        {
            "pno": 14,
            "psell": 8
        },
        {
            "pno": 32,
            "psell": 15
        },
        {
            "pno": 27,
            "psell": 16
        },
        {
            "pno": 1,
            "psell": 10
        }
    ],
    "d241221": [
        {
            "pno": 43,
            "psell": 14
        },
        {
            "pno": 19,
            "psell": 12
        },
        {
            "pno": 26,
            "psell": 15
        }
    ],
    "d241222": [
        {
            "pno": 37,
            "psell": 5
        },
        {
            "pno": 11,
            "psell": 3
        },
        {
            "pno": 9,
            "psell": 19
        },
        {
            "pno": 24,
            "psell": 18
        },
        {
            "pno": 33,
            "psell": 3
        }
    ],
    "d241223": [
        {
            "pno": 5,
            "psell": 9
        },
        {
            "pno": 2,
            "psell": 3
        },
        {
            "pno": 41,
            "psell": 6
        },
        {
            "pno": 7,
            "psell": 20
        },
        {
            "pno": 44,
            "psell": 2
        }
    ],
    "d241224": [
        {
            "pno": 43,
            "psell": 20
        },
        {
            "pno": 41,
            "psell": 5
        },
        {
            "pno": 5,
            "psell": 6
        }
    ],
    "d241225": [
        {
            "pno": 21,
            "psell": 13
        },
        {
            "pno": 50,
            "psell": 3
        },
        {
            "pno": 40,
            "psell": 11
        },
        {
            "pno": 28,
            "psell": 6
        },
        {
            "pno": 16,
            "psell": 7
        }
    ],
    "d241226": [
        {
            "pno": 32,
            "psell": 16
        },
        {
            "pno": 21,
            "psell": 15
        },
        {
            "pno": 42,
            "psell": 16
        }
    ],
    "d241227": [
        {
            "pno": 18,
            "psell": 10
        },
        {
            "pno": 24,
            "psell": 5
        },
        {
            "pno": 1,
            "psell": 10
        }
    ],
    "d241228": [
        {
            "pno": 28,
            "psell": 20
        },
        {
            "pno": 29,
            "psell": 16
        },
        {
            "pno": 5,
            "psell": 11
        },
        {
            "pno": 16,
            "psell": 1
        },
        {
            "pno": 20,
            "psell": 6
        }
    ],
    "d241229": [
        {
            "pno": 2,
            "psell": 13
        }
    ],
    "d241230": [
        {
            "pno": 45,
            "psell": 18
        },
        {
            "pno": 31,
            "psell": 15
        }
    ],
    "d241231": [
        {
            "pno": 13,
            "psell": 15
        },
        {
            "pno": 41,
            "psell": 13
        }
    ],
    "d250101": [
        {
            "pno": 3,
            "psell": 4
        },
        {
            "pno": 8,
            "psell": 12
        },
        {
            "pno": 12,
            "psell": 1
        }
    ],
    "d250102": [],
    "d250103": [
        {
            "pno": 49,
            "psell": 20
        },
        {
            "pno": 29,
            "psell": 16
        },
        {
            "pno": 2,
            "psell": 7
        }
    ],
    "d250104": [
        {
            "pno": 9,
            "psell": 8
        },
        {
            "pno": 19,
            "psell": 2
        },
        {
            "pno": 33,
            "psell": 8
        },
        {
            "pno": 17,
            "psell": 15
        },
        {
            "pno": 41,
            "psell": 1
        }
    ],
    "d250105": [
        {
            "pno": 11,
            "psell": 18
        },
        {
            "pno": 47,
            "psell": 12
        },
        {
            "pno": 43,
            "psell": 11
        },
        {
            "pno": 35,
            "psell": 6
        }
    ],
    "d250106": [
        {
            "pno": 47,
            "psell": 1
        },
        {
            "pno": 12,
            "psell": 17
        },
        {
            "pno": 33,
            "psell": 14
        },
        {
            "pno": 19,
            "psell": 12
        },
        {
            "pno": 32,
            "psell": 11
        }
    ],
    "d250107": [
        {
            "pno": 3,
            "psell": 16
        },
        {
            "pno": 46,
            "psell": 4
        },
        {
            "pno": 11,
            "psell": 13
        },
        {
            "pno": 24,
            "psell": 5
        }
    ],
    "d250108": [
        {
            "pno": 8,
            "psell": 1
        },
        {
            "pno": 9,
            "psell": 13
        },
        {
            "pno": 43,
            "psell": 20
        },
        {
            "pno": 40,
            "psell": 19
        },
        {
            "pno": 14,
            "psell": 18
        }
    ],
    "d250109": [
        {
            "pno": 12,
            "psell": 3
        }
    ],
    "d250110": [
        {
            "pno": 35,
            "psell": 7
        }
    ],
    "d250111": [],
    "d250112": [
        {
            "pno": 41,
            "psell": 11
        },
        {
            "pno": 46,
            "psell": 18
        },
        {
            "pno": 5,
            "psell": 17
        },
        {
            "pno": 35,
            "psell": 1
        }
    ],
    "d250113": [],
    "d250114": [
        {
            "pno": 12,
            "psell": 3
        },
        {
            "pno": 21,
            "psell": 20
        }
    ],
    "d250115": [
        {
            "pno": 33,
            "psell": 17
        },
        {
            "pno": 11,
            "psell": 18
        },
        {
            "pno": 20,
            "psell": 14
        },
        {
            "pno": 8,
            "psell": 9
        }
    ],
    "d250116": [
        {
            "pno": 42,
            "psell": 10
        },
        {
            "pno": 25,
            "psell": 15
        },
        {
            "pno": 39,
            "psell": 15
        },
        {
            "pno": 2,
            "psell": 4
        },
        {
            "pno": 20,
            "psell": 9
        }
    ],
    "d250117": [
        {
            "pno": 2,
            "psell": 5
        },
        {
            "pno": 14,
            "psell": 16
        },
        {
            "pno": 17,
            "psell": 6
        },
        {
            "pno": 9,
            "psell": 14
        },
        {
            "pno": 4,
            "psell": 9
        }
    ],
    "d250118": [
        {
            "pno": 41,
            "psell": 19
        }
    ],
    "d250119": [
        {
            "pno": 16,
            "psell": 14
        },
        {
            "pno": 13,
            "psell": 8
        },
        {
            "pno": 33,
            "psell": 9
        }
    ],
    "d250120": [
        {
            "pno": 37,
            "psell": 13
        }
    ],
    "d250121": [
        {
            "pno": 37,
            "psell": 17
        },
        {
            "pno": 7,
            "psell": 7
        }
    ],
    "d250122": [
        {
            "pno": 34,
            "psell": 9
        }
    ],
    "d250123": [],
    "d250124": [],
    "d250125": [
        {
            "pno": 26,
            "psell": 13
        },
        {
            "pno": 4,
            "psell": 8
        }
    ],
    "d250126": [
        {
            "pno": 20,
            "psell": 12
        },
        {
            "pno": 37,
            "psell": 10
        },
        {
            "pno": 49,
            "psell": 8
        },
        {
            "pno": 13,
            "psell": 5
        }
    ],
    "d250127": [
        {
            "pno": 9,
            "psell": 17
        },
        {
            "pno": 45,
            "psell": 8
        }
    ],
    "d250128": [
        {
            "pno": 5,
            "psell": 11
        },
        {
            "pno": 32,
            "psell": 16
        },
        {
            "pno": 34,
            "psell": 19
        }
    ],
    "d250129": [
        {
            "pno": 13,
            "psell": 2
        },
        {
            "pno": 10,
            "psell": 13
        },
        {
            "pno": 40,
            "psell": 2
        }
    ],
    "d250130": [
        {
            "pno": 6,
            "psell": 20
        },
        {
            "pno": 28,
            "psell": 9
        },
        {
            "pno": 42,
            "psell": 13
        },
        {
            "pno": 2,
            "psell": 6
        }
    ],
    "d250131": [],
    "d250201": [
        {
            "pno": 26,
            "psell": 12
        },
        {
            "pno": 2,
            "psell": 7
        },
        {
            "pno": 34,
            "psell": 16
        },
        {
            "pno": 36,
            "psell": 19
        },
        {
            "pno": 18,
            "psell": 19
        }
    ],
    "d250202": [],
    "d250203": [
        {
            "pno": 26,
            "psell": 16
        }
    ],
    "d250204": [
        {
            "pno": 49,
            "psell": 9
        },
        {
            "pno": 11,
            "psell": 14
        },
        {
            "pno": 8,
            "psell": 18
        }
    ],
    "d250205": [],
    "d250206": [],
    "d250207": [
        {
            "pno": 27,
            "psell": 16
        },
        {
            "pno": 7,
            "psell": 9
        },
        {
            "pno": 2,
            "psell": 18
        },
        {
            "pno": 36,
            "psell": 9
        },
        {
            "pno": 5,
            "psell": 16
        }
    ],
    "d250208": [
        {
            "pno": 3,
            "psell": 14
        }
    ],
    "d250209": [
        {
            "pno": 4,
            "psell": 6
        },
        {
            "pno": 24,
            "psell": 9
        }
    ],
    "d250210": [],
    "d250211": [
        {
            "pno": 42,
            "psell": 20
        }
    ],
    "d250212": [
        {
            "pno": 46,
            "psell": 2
        },
        {
            "pno": 20,
            "psell": 10
        },
        {
            "pno": 23,
            "psell": 19
        },
        {
            "pno": 4,
            "psell": 12
        },
        {
            "pno": 43,
            "psell": 15
        }
    ],
    "d250213": [
        {
            "pno": 36,
            "psell": 16
        },
        {
            "pno": 11,
            "psell": 7
        },
        {
            "pno": 46,
            "psell": 18
        }
    ],
    "d250214": [
        {
            "pno": 43,
            "psell": 13
        },
        {
            "pno": 2,
            "psell": 19
        }
    ],
    "d250215": [
        {
            "pno": 28,
            "psell": 17
        }
    ],
    "d250216": [
        {
            "pno": 19,
            "psell": 15
        },
        {
            "pno": 49,
            "psell": 3
        },
        {
            "pno": 7,
            "psell": 20
        }
    ],
    "d250217": [
        {
            "pno": 14,
            "psell": 18
        },
        {
            "pno": 40,
            "psell": 19
        },
        {
            "pno": 15,
            "psell": 17
        },
        {
            "pno": 48,
            "psell": 20
        }
    ],
    "d250218": [
        {
            "pno": 4,
            "psell": 12
        },
        {
            "pno": 41,
            "psell": 1
        },
        {
            "pno": 31,
            "psell": 4
        },
        {
            "pno": 27,
            "psell": 18
        },
        {
            "pno": 3,
            "psell": 16
        }
    ],
    "d250219": [
        {
            "pno": 18,
            "psell": 16
        }
    ],
    "d250220": [
        {
            "pno": 4,
            "psell": 7
        },
        {
            "pno": 11,
            "psell": 5
        }
    ],
    "d250221": [
        {
            "pno": 41,
            "psell": 7
        },
        {
            "pno": 15,
            "psell": 6
        },
        {
            "pno": 12,
            "psell": 5
        },
        {
            "pno": 44,
            "psell": 3
        },
        {
            "pno": 26,
            "psell": 11
        }
    ],
    "d250222": [],
    "d250223": [
        {
            "pno": 2,
            "psell": 3
        }
    ],
    "d250224": [
        {
            "pno": 30,
            "psell": 18
        }
    ],
    "d250225": [
        {
            "pno": 25,
            "psell": 6
        },
        {
            "pno": 24,
            "psell": 12
        },
        {
            "pno": 1,
            "psell": 6
        }
    ],
    "d250226": [
        {
            "pno": 30,
            "psell": 18
        },
        {
            "pno": 44,
            "psell": 6
        }
    ],
    "d250227": [
        {
            "pno": 9,
            "psell": 12
        },
        {
            "pno": 31,
            "psell": 6
        },
        {
            "pno": 44,
            "psell": 19
        },
        {
            "pno": 13,
            "psell": 6
        },
        {
            "pno": 39,
            "psell": 9
        }
    ],
    "d250228": [
        {
            "pno": 18,
            "psell": 14
        },
        {
            "pno": 39,
            "psell": 4
        },
        {
            "pno": 41,
            "psell": 16
        }
    ],
    "d250301": [],
    "d250302": [
        {
            "pno": 29,
            "psell": 2
        },
        {
            "pno": 31,
            "psell": 15
        },
        {
            "pno": 35,
            "psell": 7
        },
        {
            "pno": 20,
            "psell": 8
        }
    ],
    "d250303": [
        {
            "pno": 3,
            "psell": 6
        },
        {
            "pno": 2,
            "psell": 15
        },
        {
            "pno": 26,
            "psell": 8
        },
        {
            "pno": 17,
            "psell": 7
        }
    ],
    "d250304": [],
    "d250305": [
        {
            "pno": 33,
            "psell": 7
        },
        {
            "pno": 24,
            "psell": 8
        },
        {
            "pno": 40,
            "psell": 13
        },
        {
            "pno": 20,
            "psell": 6
        },
        {
            "pno": 13,
            "psell": 12
        }
    ],
    "d250306": [
        {
            "pno": 43,
            "psell": 17
        },
        {
            "pno": 39,
            "psell": 15
        },
        {
            "pno": 46,
            "psell": 6
        }
    ],
    "d250307": [
        {
            "pno": 27,
            "psell": 3
        },
        {
            "pno": 50,
            "psell": 12
        },
        {
            "pno": 35,
            "psell": 19
        }
    ],
    "d250308": [
        {
            "pno": 26,
            "psell": 13
        },
        {
            "pno": 34,
            "psell": 6
        },
        {
            "pno": 5,
            "psell": 6
        },
        {
            "pno": 46,
            "psell": 15
        }
    ],
    "d250309": [],
    "d250310": [
        {
            "pno": 1,
            "psell": 6
        },
        {
            "pno": 33,
            "psell": 2
        }
    ],
    "d250311": [
        {
            "pno": 26,
            "psell": 13
        },
        {
            "pno": 46,
            "psell": 7
        },
        {
            "pno": 22,
            "psell": 3
        },
        {
            "pno": 4,
            "psell": 16
        }
    ],
    "d250312": [],
    "d250313": [
        {
            "pno": 2,
            "psell": 10
        },
        {
            "pno": 38,
            "psell": 4
        },
        {
            "pno": 29,
            "psell": 7
        },
        {
            "pno": 36,
            "psell": 2
        },
        {
            "pno": 33,
            "psell": 17
        }
    ],
    "d250314": [
        {
            "pno": 31,
            "psell": 7
        },
        {
            "pno": 4,
            "psell": 20
        },
        {
            "pno": 50,
            "psell": 9
        }
    ],
    "d250315": [
        {
            "pno": 20,
            "psell": 19
        },
        {
            "pno": 13,
            "psell": 13
        },
        {
            "pno": 37,
            "psell": 11
        },
        {
            "pno": 5,
            "psell": 16
        },
        {
            "pno": 6,
            "psell": 11
        }
    ],
    "d250316": [
        {
            "pno": 44,
            "psell": 11
        },
        {
            "pno": 42,
            "psell": 4
        },
        {
            "pno": 4,
            "psell": 8
        },
        {
            "pno": 47,
            "psell": 19
        }
    ],
    "d250317": [
        {
            "pno": 4,
            "psell": 11
        }
    ],
    "d250318": [
        {
            "pno": 34,
            "psell": 10
        },
        {
            "pno": 45,
            "psell": 5
        },
        {
            "pno": 3,
            "psell": 3
        }
    ],
    "d250319": [
        {
            "pno": 42,
            "psell": 19
        },
        {
            "pno": 44,
            "psell": 3
        },
        {
            "pno": 24,
            "psell": 18
        }
    ],
    "d250320": [
        {
            "pno": 30,
            "psell": 16
        },
        {
            "pno": 40,
            "psell": 6
        },
        {
            "pno": 4,
            "psell": 15
        },
        {
            "pno": 7,
            "psell": 14
        }
    ],
    "d250321": [],
    "d250322": [
        {
            "pno": 10,
            "psell": 6
        },
        {
            "pno": 35,
            "psell": 20
        },
        {
            "pno": 38,
            "psell": 6
        }
    ],
    "d250323": [
        {
            "pno": 40,
            "psell": 20
        },
        {
            "pno": 32,
            "psell": 13
        },
        {
            "pno": 28,
            "psell": 4
        }
    ],
    "d250324": [
        {
            "pno": 3,
            "psell": 13
        },
        {
            "pno": 27,
            "psell": 19
        },
        {
            "pno": 23,
            "psell": 17
        },
        {
            "pno": 33,
            "psell": 3
        },
        {
            "pno": 25,
            "psell": 12
        }
    ],
    "d250325": [
        {
            "pno": 50,
            "psell": 12
        },
        {
            "pno": 30,
            "psell": 8
        },
        {
            "pno": 33,
            "psell": 13
        },
        {
            "pno": 1,
            "psell": 9
        }
    ],
    "d250326": [],
    "d250327": [
        {
            "pno": 9,
            "psell": 1
        },
        {
            "pno": 32,
            "psell": 12
        },
        {
            "pno": 7,
            "psell": 1
        }
    ],
    "d250328": [
        {
            "pno": 20,
            "psell": 14
        },
        {
            "pno": 35,
            "psell": 1
        },
        {
            "pno": 2,
            "psell": 9
        },
        {
            "pno": 43,
            "psell": 15
        },
        {
            "pno": 29,
            "psell": 1
        }
    ],
    "d250329": [
        {
            "pno": 5,
            "psell": 4
        },
        {
            "pno": 6,
            "psell": 6
        }
    ],
    "d250330": [
        {
            "pno": 26,
            "psell": 20
        },
        {
            "pno": 39,
            "psell": 14
        }
    ],
    "d250331": [
        {
            "pno": 29,
            "psell": 6
        },
        {
            "pno": 48,
            "psell": 5
        },
        {
            "pno": 23,
            "psell": 17
        },
        {
            "pno": 28,
            "psell": 16
        },
        {
            "pno": 50,
            "psell": 11
        }
    ],
    "d250401": [],
    "d250402": [
        {
            "pno": 6,
            "psell": 20
        },
        {
            "pno": 44,
            "psell": 6
        }
    ],
    "d250403": [
        {
            "pno": 31,
            "psell": 11
        },
        {
            "pno": 20,
            "psell": 18
        },
        {
            "pno": 3,
            "psell": 20
        },
        {
            "pno": 16,
            "psell": 1
        },
        {
            "pno": 19,
            "psell": 17
        }
    ],
    "d250404": [
        {
            "pno": 4,
            "psell": 19
        },
        {
            "pno": 44,
            "psell": 18
        }
    ],
    "d250405": [
        {
            "pno": 5,
            "psell": 8
        },
        {
            "pno": 50,
            "psell": 8
        },
        {
            "pno": 12,
            "psell": 20
        }
    ],
    "d250406": [
        {
            "pno": 21,
            "psell": 6
        },
        {
            "pno": 2,
            "psell": 5
        },
        {
            "pno": 38,
            "psell": 15
        }
    ],
    "d250407": [
        {
            "pno": 42,
            "psell": 3
        }
    ],
    "d250408": [
        {
            "pno": 39,
            "psell": 20
        }
    ],
    "d250409": [
        {
            "pno": 33,
            "psell": 2
        },
        {
            "pno": 1,
            "psell": 18
        }
    ],
    "d250410": [
        {
            "pno": 13,
            "psell": 11
        },
        {
            "pno": 16,
            "psell": 2
        },
        {
            "pno": 42,
            "psell": 9
        }
    ],
    "d250411": [
        {
            "pno": 32,
            "psell": 13
        },
        {
            "pno": 1,
            "psell": 6
        },
        {
            "pno": 29,
            "psell": 18
        },
        {
            "pno": 45,
            "psell": 14
        },
        {
            "pno": 12,
            "psell": 13
        }
    ],
    "d250412": [
        {
            "pno": 17,
            "psell": 14
        }
    ],
    "d250413": [
        {
            "pno": 8,
            "psell": 5
        }
    ],
    "d250414": [
        {
            "pno": 43,
            "psell": 14
        },
        {
            "pno": 17,
            "psell": 13
        },
        {
            "pno": 41,
            "psell": 16
        },
        {
            "pno": 29,
            "psell": 19
        },
        {
            "pno": 35,
            "psell": 2
        }
    ],
    "d250415": [
        {
            "pno": 39,
            "psell": 19
        },
        {
            "pno": 26,
            "psell": 19
        },
        {
            "pno": 46,
            "psell": 15
        },
        {
            "pno": 20,
            "psell": 1
        },
        {
            "pno": 2,
            "psell": 20
        }
    ],
    "d250416": [
        {
            "pno": 30,
            "psell": 9
        },
        {
            "pno": 6,
            "psell": 1
        },
        {
            "pno": 1,
            "psell": 9
        },
        {
            "pno": 12,
            "psell": 19
        },
        {
            "pno": 15,
            "psell": 11
        }
    ],
    "d250417": [
        {
            "pno": 23,
            "psell": 19
        },
        {
            "pno": 15,
            "psell": 19
        }
    ],
    "d250418": [
        {
            "pno": 33,
            "psell": 8
        },
        {
            "pno": 30,
            "psell": 16
        },
        {
            "pno": 45,
            "psell": 12
        }
    ],
    "d250419": [
        {
            "pno": 35,
            "psell": 1
        }
    ],
    "d250420": [
        {
            "pno": 9,
            "psell": 16
        },
        {
            "pno": 32,
            "psell": 14
        },
        {
            "pno": 48,
            "psell": 4
        },
        {
            "pno": 33,
            "psell": 10
        },
        {
            "pno": 28,
            "psell": 5
        }
    ],
    "d250421": [
        {
            "pno": 50,
            "psell": 3
        },
        {
            "pno": 39,
            "psell": 5
        },
        {
            "pno": 38,
            "psell": 2
        }
    ],
    "d250422": [
        {
            "pno": 15,
            "psell": 16
        },
        {
            "pno": 14,
            "psell": 2
        },
        {
            "pno": 24,
            "psell": 6
        },
        {
            "pno": 44,
            "psell": 13
        },
        {
            "pno": 50,
            "psell": 14
        }
    ],
    "d250423": [
        {
            "pno": 22,
            "psell": 16
        },
        {
            "pno": 15,
            "psell": 10
        }
    ],
    "d250424": [
        {
            "pno": 7,
            "psell": 16
        },
        {
            "pno": 11,
            "psell": 8
        },
        {
            "pno": 13,
            "psell": 7
        }
    ],
    "d250425": [
        {
            "pno": 50,
            "psell": 11
        },
        {
            "pno": 40,
            "psell": 20
        },
        {
            "pno": 9,
            "psell": 6
        },
        {
            "pno": 4,
            "psell": 1
        }
    ],
    "d250426": [
        {
            "pno": 48,
            "psell": 16
        },
        {
            "pno": 1,
            "psell": 17
        }
    ],
    "d250427": [
        {
            "pno": 32,
            "psell": 11
        },
        {
            "pno": 42,
            "psell": 20
        },
        {
            "pno": 15,
            "psell": 9
        }
    ],
    "d250428": [
        {
            "pno": 46,
            "psell": 8
        },
        {
            "pno": 10,
            "psell": 19
        },
        {
            "pno": 49,
            "psell": 12
        }
    ],
    "d250429": [],
    "d250430": [
        {
            "pno": 35,
            "psell": 9
        },
        {
            "pno": 28,
            "psell": 17
        }
    ],
    "d250501": [
        {
            "pno": 44,
            "psell": 8
        },
        {
            "pno": 17,
            "psell": 20
        },
        {
            "pno": 7,
            "psell": 3
        },
        {
            "pno": 46,
            "psell": 2
        }
    ],
    "d250502": [
        {
            "pno": 25,
            "psell": 17
        },
        {
            "pno": 10,
            "psell": 5
        },
        {
            "pno": 41,
            "psell": 8
        }
    ],
    "d250503": [
        {
            "pno": 31,
            "psell": 3
        }
    ],
    "d250504": [],
    "d250505": [
        {
            "pno": 1,
            "psell": 5
        }
    ],
    "d250506": [
        {
            "pno": 11,
            "psell": 12
        },
        {
            "pno": 30,
            "psell": 3
        }
    ],
    "d250507": [
        {
            "pno": 2,
            "psell": 10
        },
        {
            "pno": 17,
            "psell": 11
        },
        {
            "pno": 22,
            "psell": 19
        },
        {
            "pno": 19,
            "psell": 16
        },
        {
            "pno": 28,
            "psell": 2
        }
    ],
    "d250508": [
        {
            "pno": 38,
            "psell": 13
        },
        {
            "pno": 37,
            "psell": 2
        },
        {
            "pno": 1,
            "psell": 2
        },
        {
            "pno": 42,
            "psell": 13
        }
    ],
    "d250509": [
        {
            "pno": 35,
            "psell": 16
        },
        {
            "pno": 5,
            "psell": 5
        },
        {
            "pno": 7,
            "psell": 12
        },
        {
            "pno": 38,
            "psell": 4
        },
        {
            "pno": 4,
            "psell": 7
        }
    ],
    "d250510": [
        {
            "pno": 39,
            "psell": 18
        },
        {
            "pno": 35,
            "psell": 10
        },
        {
            "pno": 23,
            "psell": 6
        }
    ],
    "d250511": [
        {
            "pno": 1,
            "psell": 11
        },
        {
            "pno": 5,
            "psell": 13
        }
    ],
    "d250512": [
        {
            "pno": 50,
            "psell": 1
        },
        {
            "pno": 19,
            "psell": 16
        },
        {
            "pno": 45,
            "psell": 20
        }
    ],
    "d250513": [
        {
            "pno": 22,
            "psell": 5
        },
        {
            "pno": 46,
            "psell": 15
        },
        {
            "pno": 49,
            "psell": 5
        },
        {
            "pno": 42,
            "psell": 8
        }
    ],
    "d250514": [
        {
            "pno": 14,
            "psell": 17
        },
        {
            "pno": 39,
            "psell": 16
        },
        {
            "pno": 41,
            "psell": 15
        },
        {
            "pno": 2,
            "psell": 16
        },
        {
            "pno": 18,
            "psell": 12
        }
    ],
    "d250515": [
        {
            "pno": 16,
            "psell": 16
        },
        {
            "pno": 17,
            "psell": 20
        },
        {
            "pno": 31,
            "psell": 19
        },
        {
            "pno": 40,
            "psell": 16
        }
    ],
    "d250516": [
        {
            "pno": 33,
            "psell": 14
        },
        {
            "pno": 24,
            "psell": 10
        },
        {
            "pno": 34,
            "psell": 14
        }
    ],
    "d250517": [],
    "d250518": [
        {
            "pno": 18,
            "psell": 17
        }
    ],
    "d250519": [
        {
            "pno": 44,
            "psell": 12
        }
    ],
    "d250520": [
        {
            "pno": 7,
            "psell": 1
        },
        {
            "pno": 46,
            "psell": 20
        },
        {
            "pno": 22,
            "psell": 13
        },
        {
            "pno": 38,
            "psell": 5
        }
    ],
    "d250521": [
        {
            "pno": 19,
            "psell": 18
        },
        {
            "pno": 30,
            "psell": 14
        },
        {
            "pno": 26,
            "psell": 5
        },
        {
            "pno": 17,
            "psell": 11
        },
        {
            "pno": 25,
            "psell": 17
        }
    ],
    "d250522": [
        {
            "pno": 8,
            "psell": 5
        },
        {
            "pno": 13,
            "psell": 19
        },
        {
            "pno": 25,
            "psell": 14
        },
        {
            "pno": 35,
            "psell": 8
        }
    ],
    "d250523": [
        {
            "pno": 9,
            "psell": 10
        },
        {
            "pno": 25,
            "psell": 16
        },
        {
            "pno": 46,
            "psell": 11
        }
    ],
    "d250524": [
        {
            "pno": 42,
            "psell": 17
        },
        {
            "pno": 38,
            "psell": 8
        }
    ],
    "d250525": [
        {
            "pno": 4,
            "psell": 11
        },
        {
            "pno": 16,
            "psell": 10
        }
    ],
    "d250526": [
        {
            "pno": 9,
            "psell": 12
        },
        {
            "pno": 7,
            "psell": 19
        },
        {
            "pno": 48,
            "psell": 3
        },
        {
            "pno": 27,
            "psell": 13
        },
        {
            "pno": 32,
            "psell": 17
        }
    ],
    "d250527": [
        {
            "pno": 47,
            "psell": 14
        },
        {
            "pno": 41,
            "psell": 12
        },
        {
            "pno": 27,
            "psell": 12
        }
    ],
    "d250528": [
        {
            "pno": 34,
            "psell": 1
        },
        {
            "pno": 6,
            "psell": 6
        },
        {
            "pno": 22,
            "psell": 6
        },
        {
            "pno": 2,
            "psell": 13
        }
    ],
    "d250529": [
        {
            "pno": 8,
            "psell": 8
        },
        {
            "pno": 46,
            "psell": 1
        },
        {
            "pno": 14,
            "psell": 16
        },
        {
            "pno": 43,
            "psell": 20
        }
    ],
    "d250530": [
        {
            "pno": 33,
            "psell": 5
        },
        {
            "pno": 50,
            "psell": 20
        },
        {
            "pno": 19,
            "psell": 14
        },
        {
            "pno": 43,
            "psell": 14
        }
    ],
    "d250531": [
        {
            "pno": 9,
            "psell": 6
        },
        {
            "pno": 18,
            "psell": 15
        },
        {
            "pno": 3,
            "psell": 6
        },
        {
            "pno": 10,
            "psell": 17
        },
        {
            "pno": 42,
            "psell": 16
        }
    ],
    "d250601": [
        {
            "pno": 4,
            "psell": 17
        },
        {
            "pno": 21,
            "psell": 5
        },
        {
            "pno": 9,
            "psell": 10
        }
    ],
    "d250602": [
        {
            "pno": 42,
            "psell": 19
        },
        {
            "pno": 12,
            "psell": 6
        }
    ],
    "d250603": [
        {
            "pno": 10,
            "psell": 3
        },
        {
            "pno": 44,
            "psell": 20
        },
        {
            "pno": 11,
            "psell": 19
        }
    ],
    "d250604": [
        {
            "pno": 13,
            "psell": 8
        },
        {
            "pno": 25,
            "psell": 8
        }
    ],
    "d250605": [
        {
            "pno": 13,
            "psell": 19
        }
    ],
    "d250606": [
        {
            "pno": 40,
            "psell": 19
        },
        {
            "pno": 14,
            "psell": 11
        },
        {
            "pno": 19,
            "psell": 5
        }
    ],
    "d250607": [],
    "d250608": [
        {
            "pno": 1,
            "psell": 17
        },
        {
            "pno": 42,
            "psell": 1
        },
        {
            "pno": 24,
            "psell": 12
        },
        {
            "pno": 7,
            "psell": 9
        }
    ],
    "d250609": [],
    "d250610": [
        {
            "pno": 17,
            "psell": 13
        },
        {
            "pno": 36,
            "psell": 5
        },
        {
            "pno": 49,
            "psell": 5
        }
    ],
    "d250611": [
        {
            "pno": 33,
            "psell": 16
        },
        {
            "pno": 38,
            "psell": 11
        },
        {
            "pno": 8,
            "psell": 1
        }
    ],
    "d250612": [
        {
            "pno": 14,
            "psell": 9
        }
    ],
    "d250613": [],
    "d250614": [
        {
            "pno": 23,
            "psell": 12
        },
        {
            "pno": 33,
            "psell": 3
        }
    ],
    "d250615": [],
    "d250616": [
        {
            "pno": 48,
            "psell": 4
        }
    ],
    "d250617": [
        {
            "pno": 50,
            "psell": 3
        },
        {
            "pno": 22,
            "psell": 7
        },
        {
            "pno": 24,
            "psell": 11
        },
        {
            "pno": 12,
            "psell": 9
        },
        {
            "pno": 1,
            "psell": 6
        }
    ],
    "d250618": [
        {
            "pno": 49,
            "psell": 2
        },
        {
            "pno": 31,
            "psell": 11
        }
    ],
    "d250619": [
        {
            "pno": 23,
            "psell": 16
        },
        {
            "pno": 4,
            "psell": 14
        },
        {
            "pno": 26,
            "psell": 13
        }
    ],
    "d250620": [
        {
            "pno": 9,
            "psell": 1
        },
        {
            "pno": 4,
            "psell": 17
        },
        {
            "pno": 23,
            "psell": 20
        },
        {
            "pno": 39,
            "psell": 10
        },
        {
            "pno": 31,
            "psell": 20
        }
    ],
    "d250621": [
        {
            "pno": 1,
            "psell": 15
        },
        {
            "pno": 14,
            "psell": 17
        },
        {
            "pno": 46,
            "psell": 18
        }
    ],
    "d250622": [
        {
            "pno": 41,
            "psell": 6
        },
        {
            "pno": 33,
            "psell": 19
        },
        {
            "pno": 4,
            "psell": 17
        }
    ],
    "d250623": [],
    "d250624": [
        {
            "pno": 16,
            "psell": 6
        },
        {
            "pno": 39,
            "psell": 3
        },
        {
            "pno": 42,
            "psell": 2
        },
        {
            "pno": 28,
            "psell": 2
        },
        {
            "pno": 37,
            "psell": 13
        }
    ],
    "d250625": [],
    "d250626": [
        {
            "pno": 28,
            "psell": 5
        },
        {
            "pno": 32,
            "psell": 17
        },
        {
            "pno": 9,
            "psell": 1
        },
        {
            "pno": 23,
            "psell": 2
        }
    ],
    "d250627": [
        {
            "pno": 19,
            "psell": 20
        },
        {
            "pno": 34,
            "psell": 6
        }
    ],
    "d250628": [
        {
            "pno": 25,
            "psell": 3
        },
        {
            "pno": 8,
            "psell": 2
        },
        {
            "pno": 30,
            "psell": 1
        }
    ],
    "d250629": [
        {
            "pno": 34,
            "psell": 3
        }
    ],
    "d250630": [
        {
            "pno": 27,
            "psell": 18
        },
        {
            "pno": 7,
            "psell": 11
        },
        {
            "pno": 22,
            "psell": 9
        },
        {
            "pno": 45,
            "psell": 15
        },
        {
            "pno": 1,
            "psell": 3
        }
    ]
}
  // 제품 목록 (pno ↔ pName 매핑용)
// seedProd.js
/* productList.js  ─ seedProd 교체본 */
// seedProd.js
const seedProd = [
  { pno: 1,  pName: "돼지바",       pImg: "../jpg/1.png",  pPrice: 500,  pAmount: 118 },
  { pno: 2,  pName: "빠삐코",       pImg: "../jpg/2.png",  pPrice: 700,  pAmount:  59 },
  { pno: 3,  pName: "월드콘",       pImg: "../jpg/3.png",  pPrice: 1200, pAmount: 107 },
  { pno: 4,  pName: "메로나",       pImg: "../jpg/4.png",  pPrice: 600,  pAmount: 123 },
  { pno: 5,  pName: "비비빅",       pImg: "../jpg/5.png",  pPrice: 500,  pAmount:  63 },
  { pno: 6,  pName: "스크류바",     pImg: "../jpg/6.png",  pPrice: 800,  pAmount: 115 },
  { pno: 7,  pName: "죠스바",       pImg: "../jpg/7.png",  pPrice: 800,  pAmount:  43 },
  { pno: 8,  pName: "수박바",       pImg: "../jpg/8.png",  pPrice: 1000, pAmount:  75 },
  { pno: 9,  pName: "폴라포",       pImg: "../jpg/9.png",  pPrice: 500,  pAmount:  72 },
  { pno: 10, pName: "와",           pImg: "../jpg/10.png", pPrice: 1200, pAmount: 61 },
  { pno: 11, pName: "붕어싸만코",   pImg: "../jpg/11.png", pPrice: 1200, pAmount: 127 },
  { pno: 12, pName: "더위사냥",     pImg: "../jpg/12.png", pPrice: 700,  pAmount: 110 },
  { pno: 13, pName: "돼지콘",       pImg: "../jpg/13.png", pPrice: 900,  pAmount: 116 },
  { pno: 14, pName: "쿠앤크콘",     pImg: "../jpg/14.png", pPrice: 1000, pAmount: 118 },
  { pno: 15, pName: "찰떡아이스",   pImg: "../jpg/15.png", pPrice: 1100, pAmount: 79 },
  { pno: 16, pName: "옥동자",       pImg: "../jpg/16.png", pPrice: 700,  pAmount: 119 },
  { pno: 17, pName: "아맛나",       pImg: "../jpg/17.png", pPrice: 500,  pAmount: 41 },
  { pno: 18, pName: "투게더",       pImg: "../jpg/18.png", pPrice: 1500, pAmount: 102 },
  { pno: 19, pName: "누가바",       pImg: "../jpg/19.png", pPrice: 600,  pAmount: 55 },
  { pno: 20, pName: "엔초",         pImg: "../jpg/20.png", pPrice: 1000, pAmount: 87 },
  { pno: 21, pName: "그린티몬스터", pImg: "../jpg/21.png", pPrice: 1300, pAmount: 87 },
  { pno: 22, pName: "탱크보이",     pImg: "../jpg/22.png", pPrice: 1000, pAmount: 101 },
  { pno: 23, pName: "쿠앤크바",     pImg: "../jpg/23.png", pPrice: 1000, pAmount: 51 },
  { pno: 24, pName: "브라보콘",     pImg: "../jpg/24.png", pPrice: 1200, pAmount: 76 },
  { pno: 25, pName: "크런키바",     pImg: "../jpg/25.png", pPrice: 900,  pAmount: 168 },
  { pno: 26, pName: "마이쮸아이스", pImg: "../jpg/26.png", pPrice: 800,  pAmount: 96 },
  { pno: 27, pName: "젤리슬러시",   pImg: "../jpg/27.png", pPrice: 600,  pAmount: 153 },
  { pno: 28, pName: "망고탱고",     pImg: "../jpg/28.png", pPrice: 1000, pAmount: 128 },
  { pno: 29, pName: "팥빙수바",     pImg: "../jpg/29.png", pPrice: 1300, pAmount: 48 },
  { pno: 30, pName: "초코퍼지",     pImg: "../jpg/30.png", pPrice: 900,  pAmount: 97 },
  { pno: 31, pName: "민트초코슈퍼콘", pImg: "../jpg/31.png", pPrice: 1000, pAmount: 119 },
  { pno: 32, pName: "블루베리바",   pImg: "../jpg/32.png", pPrice: 800,  pAmount: 55 },
  { pno: 33, pName: "망고셔벗",     pImg: "../jpg/33.png", pPrice: 1100, pAmount: 90 },
  { pno: 34, pName: "요거트아이스", pImg: "../jpg/34.png", pPrice: 1100, pAmount: 15 },
  { pno: 35, pName: "요맘때딸기콘", pImg: "../jpg/35.png", pPrice: 1000, pAmount: 70 },
  { pno: 36, pName: "오렌지팝",     pImg: "../jpg/36.png", pPrice: 900,  pAmount: 114 },
  { pno: 37, pName: "zero콜라바",   pImg: "../jpg/37.png", pPrice: 700,  pAmount: 49 },
  { pno: 38, pName: "와일드바디",   pImg: "../jpg/38.png", pPrice: 800,  pAmount: 82 },
  { pno: 39, pName: "마카롱바",     pImg: "../jpg/39.png", pPrice: 1200, pAmount: 103 },
  { pno: 40, pName: "국화빵",       pImg: "../jpg/40.png", pPrice: 1000, pAmount: 69 },
  { pno: 41, pName: "모찌롤아이스", pImg: "../jpg/41.png", pPrice: 1200, pAmount: 125 },
  { pno: 42, pName: "빵또아",       pImg: "../jpg/42.png", pPrice: 1500, pAmount: 118 },
  { pno: 43, pName: "구구콘",       pImg: "../jpg/43.png", pPrice: 1000, pAmount: 97 },
  { pno: 44, pName: "체리마루",     pImg: "../jpg/44.png", pPrice: 700,  pAmount: 52 },
  { pno: 45, pName: "피스타치오부라보콘", pImg: "../jpg/45.png", pPrice: 1100, pAmount: 70 },
  { pno: 46, pName: "복숭아바",     pImg: "../jpg/46.png", pPrice: 900,  pAmount: 81 },
  { pno: 47, pName: "청포도바",     pImg: "../jpg/47.png", pPrice: 800,  pAmount: 111 },
  { pno: 48, pName: "요맘때플레인콘", pImg: "../jpg/48.png", pPrice: 1000, pAmount: 55 },
  { pno: 49, pName: "쌍쌍바",       pImg: "../jpg/49.png", pPrice: 1000, pAmount: 65 },
  { pno: 50, pName: "자바초코칩",   pImg: "../jpg/50.png", pPrice: 1000, pAmount: 50 }
];




  // LocalStorage 초기화 (최초 방문 시에만 seed 저장)
  if (!localStorage.getItem(SALE_KEY)) {
    localStorage.setItem(SALE_KEY, JSON.stringify(seedSale));
  }
  if (!localStorage.getItem(PROD_KEY)) {
    localStorage.setItem(PROD_KEY, JSON.stringify(seedProd));
  }

  // 메모리로 로드
  const saleData    = JSON.parse(localStorage.getItem(SALE_KEY));
  const productList = JSON.parse(localStorage.getItem(PROD_KEY));

  /* ---------------- 1. 유틸 함수 --------------------------- */
  const pnoToName = (pno) =>
    (productList.find((p) => p.pno === Number(pno)) || {}).pName || `제품#${pno}`;

  const sumByPno = (rows) =>
    rows.reduce((acc, { pno, psell }) => {
      acc[pno] = (acc[pno] || 0) + psell;
      return acc;
    }, {});

  /* ---------------- 2. 월/분기 매핑 ------------------------ */
  const monthCfg = [
    { btn: 'janToggleBtn',  canvas: 'jan24Input', code: '2401', label: '24년 1월' },
    { btn: 'febToggleBtn',  canvas: 'feb24Input', code: '2402', label: '24년 2월' },
    { btn: 'marToggleBtn',  canvas: 'mar24Input', code: '2403', label: '24년 3월' },
    { btn: 'aprToggleBtn',  canvas: 'apr24Input', code: '2404', label: '24년 4월' },
    { btn: 'mayToggleBtn',  canvas: 'may24Input', code: '2405', label: '24년 5월' },
    { btn: 'junToggleBtn',  canvas: 'jun24Input', code: '2406', label: '24년 6월' },
    { btn: 'julToggleBtn',  canvas: 'jul24Input', code: '2407', label: '24년 7월' },
    { btn: 'augToggleBtn',  canvas: 'aug24Input', code: '2408', label: '24년 8월' },
    { btn: 'sepToggleBtn',  canvas: 'sep24Input', code: '2409', label: '24년 9월' },
    { btn: 'octToggleBtn',  canvas: 'oct24Input', code: '2410', label: '24년 10월' },
    { btn: 'novToggleBtn',  canvas: 'nov24Input', code: '2411', label: '24년 11월' },
    { btn: 'decToggleBtn',  canvas: 'dec24Input', code: '2412', label: '24년 12월' },
    { btn: 'jan25ToggleBtn', canvas: 'jan25Input', code: '2501', label: '25년 1월' },
    { btn: 'feb25ToggleBtn', canvas: 'feb25Input', code: '2502', label: '25년 2월' },
    { btn: 'mar25ToggleBtn', canvas: 'mar25Input', code: '2503', label: '25년 3월' },
    { btn: 'apr25ToggleBtn', canvas: 'apr25Input', code: '2504', label: '25년 4월' },
    { btn: 'may25ToggleBtn', canvas: 'may25Input', code: '2505', label: '25년 5월' },
    { btn: 'jun25ToggleBtn', canvas: 'jun25Input', code: '2506', label: '25년 6월' },
    { btn: 'jul25ToggleBtn', canvas: 'jul25Input', code: '2507', label: '25년 7월' },
  ];

  const quarterCfg = [
    { btn: 'fst24ToggleBtn', canvas: 'fst24Input', codes: ['2401','2402','2403'], label: '24년 1분기' },
    { btn: 'snd24ToggleBtn', canvas: 'snd24Input', codes: ['2404','2405','2406'], label: '24년 2분기' },
    { btn: 'trd24ToggleBtn', canvas: 'trd24Input', codes: ['2407','2408','2409'], label: '24년 3분기' },
    { btn: 'fth24ToggleBtn', canvas: 'fth24Input', codes: ['2410','2411','2412'], label: '24년 4분기' },
    { btn: 'fst25ToggleBtn', canvas: 'fst25Input', codes: ['2501','2502','2503'], label: '25년 1분기' },
    { btn: 'snd25ToggleBtn', canvas: 'snd25Input', codes: ['2504','2505','2506'], label: '25년 2분기' },
  ];

  /* ---------------- 3. Chart 렌더 ------------------------ */
  function buildChart(canvasId, title, map) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(map).map(pnoToName),
        datasets: [{
          label: title,
          data: Object.values(map),
          backgroundColor: 'rgba(13,110,253,0.6)',
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, title: { display: true, text: '판매 수량' } } },
      }
    });
  }

  /* ---------------- 4. 데이터 집계 ----------------------- */
  function rowsForCodes(codes) {
    const prefixes = codes.map(c => 'd' + c);
    return Object.entries(saleData)
      .filter(([k]) => prefixes.some(p => k.startsWith(p)))
      .flatMap(([, v]) => v);
  }

  /* ---------------- 5. UI 토글 -------------------------- */
  const chartContainer  = document.getElementById('ChartContainer');
  const branchContainer = document.getElementById('branchChartContainer');

  function hideAllCanvas() {
    [...chartContainer.querySelectorAll('canvas'),
     ...branchContainer.querySelectorAll('canvas')]
     .forEach(c => c.style.display = 'none');
  }

  function show(container, canvasId) {
    chartContainer.style.display  = (container === chartContainer) ? 'block' : 'none';
    branchContainer.style.display = (container === branchContainer) ? 'block' : 'none';
    hideAllCanvas();
    document.getElementById(canvasId).style.display = 'block';
  }

  /* ---------------- 6. 초기화 --------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    // 오늘 날짜 출력
    const nowSpan = document.getElementById('nowDate');
    if (nowSpan) nowSpan.textContent = new Date().toLocaleDateString('ko-KR');

    // 월별 차트 준비 및 버튼 바인딩
    monthCfg.forEach(({ btn, canvas, code, label }) => {
      buildChart(canvas, label, sumByPno(rowsForCodes([code])));
      document.getElementById(btn).addEventListener('click', () => {
        show(chartContainer, canvas);
      });
    });

    // 분기별 차트 준비 및 버튼 바인딩
    quarterCfg.forEach(({ btn, canvas, codes, label }) => {
      buildChart(canvas, label, sumByPno(rowsForCodes(codes)));
      document.getElementById(btn).addEventListener('click', () => {
        show(branchContainer, canvas);
      });
    });
  });
})();

