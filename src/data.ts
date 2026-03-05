export interface JuzRange {
  juz: number
  from_ayah: number
  to_ayah: number
}
export interface Surah {
  name: string
  number: number
  ayah_count: number
  arabic_name: string
  juz: JuzRange[]
}
export interface Quraa {
  [key: string]: {
    subfolder: string
    name: string
    arabicName: string
    bitrate: string
  }
}
export const allSurahs: Surah[] = [
  {
    number: 1,
    name: "Al-Fatihah",
    arabic_name: "الفاتحة",
    ayah_count: 7,
    juz: [
      {
        juz: 1,
        from_ayah: 1,
        to_ayah: 7
      }
    ]
  },
  {
    number: 2,
    name: "Al-Baqarah",
    arabic_name: "البقرة",
    ayah_count: 286,
    juz: [
      {
        juz: 1,
        from_ayah: 1,
        to_ayah: 141
      },
      {
        juz: 2,
        from_ayah: 142,
        to_ayah: 252
      },
      {
        juz: 3,
        from_ayah: 253,
        to_ayah: 286
      }
    ]
  },
  {
    number: 3,
    name: "Aal-E-Imran",
    arabic_name: "آل عمران",
    ayah_count: 200,
    juz: [
      {
        juz: 3,
        from_ayah: 1,
        to_ayah: 92
      },
      {
        juz: 4,
        from_ayah: 93,
        to_ayah: 200
      }
    ]
  },
  {
    number: 4,
    name: "An-Nisa",
    arabic_name: "النساء",
    ayah_count: 176,
    juz: [
      {
        juz: 4,
        from_ayah: 1,
        to_ayah: 23
      },
      {
        juz: 5,
        from_ayah: 24,
        to_ayah: 147
      },
      {
        juz: 6,
        from_ayah: 148,
        to_ayah: 176
      }
    ]
  },
  {
    number: 5,
    name: "Al-Ma'idah",
    arabic_name: "المائدة",
    ayah_count: 120,
    juz: [
      {
        juz: 6,
        from_ayah: 1,
        to_ayah: 81
      },
      {
        juz: 7,
        from_ayah: 82,
        to_ayah: 120
      }
    ]
  },
  {
    number: 6,
    name: "Al-An'am",
    arabic_name: "الأنعام",
    ayah_count: 165,
    juz: [
      {
        juz: 7,
        from_ayah: 1,
        to_ayah: 110
      },
      {
        juz: 8,
        from_ayah: 111,
        to_ayah: 165
      }
    ]
  },
  {
    number: 7,
    name: "Al-A'raf",
    arabic_name: "الأعراف",
    ayah_count: 206,
    juz: [
      {
        juz: 8,
        from_ayah: 1,
        to_ayah: 87
      },
      {
        juz: 9,
        from_ayah: 88,
        to_ayah: 206
      }
    ]
  },
  {
    number: 8,
    name: "Al-Anfal",
    arabic_name: "الأنفال",
    ayah_count: 75,
    juz: [
      {
        juz: 9,
        from_ayah: 1,
        to_ayah: 40
      },
      {
        juz: 10,
        from_ayah: 41,
        to_ayah: 75
      }
    ]
  },
  {
    number: 9,
    name: "At-Tawbah",
    arabic_name: "التوبة",
    ayah_count: 129,
    juz: [
      {
        juz: 10,
        from_ayah: 1,
        to_ayah: 92
      },
      {
        juz: 11,
        from_ayah: 93,
        to_ayah: 129
      }
    ]
  },
  {
    number: 10,
    name: "Yunus",
    arabic_name: "يونس",
    ayah_count: 109,
    juz: [
      {
        juz: 11,
        from_ayah: 1,
        to_ayah: 109
      }
    ]
  },
  {
    number: 11,
    name: "Hud",
    arabic_name: "هود",
    ayah_count: 123,
    juz: [
      {
        juz: 11,
        from_ayah: 1,
        to_ayah: 5
      },
      {
        juz: 12,
        from_ayah: 6,
        to_ayah: 123
      }
    ]
  },
  {
    number: 12,
    name: "Yusuf",
    arabic_name: "يوسف",
    ayah_count: 111,
    juz: [
      {
        juz: 12,
        from_ayah: 1,
        to_ayah: 52
      },
      {
        juz: 13,
        from_ayah: 53,
        to_ayah: 111
      }
    ]
  },
  {
    number: 13,
    name: "Ar-Ra'd",
    arabic_name: "الرعد",
    ayah_count: 43,
    juz: [
      {
        juz: 13,
        from_ayah: 1,
        to_ayah: 43
      }
    ]
  },
  {
    number: 14,
    name: "Ibrahim",
    arabic_name: "إبراهيم",
    ayah_count: 52,
    juz: [
      {
        juz: 13,
        from_ayah: 1,
        to_ayah: 52
      }
    ]
  },
  {
    number: 15,
    name: "Al-Hijr",
    arabic_name: "الحجر",
    ayah_count: 99,
    juz: [
      {
        juz: 14,
        from_ayah: 1,
        to_ayah: 99
      }
    ]
  },
  {
    number: 16,
    name: "An-Nahl",
    arabic_name: "النحل",
    ayah_count: 128,
    juz: [
      {
        juz: 14,
        from_ayah: 1,
        to_ayah: 128
      }
    ]
  },
  {
    number: 17,
    name: "Al-Isra",
    arabic_name: "الإسراء",
    ayah_count: 111,
    juz: [
      {
        juz: 15,
        from_ayah: 1,
        to_ayah: 111
      }
    ]
  },
  {
    number: 18,
    name: "Al-Kahf",
    arabic_name: "الكهف",
    ayah_count: 110,
    juz: [
      {
        juz: 15,
        from_ayah: 1,
        to_ayah: 74
      },
      {
        juz: 16,
        from_ayah: 75,
        to_ayah: 110
      }
    ]
  },
  {
    number: 19,
    name: "Maryam",
    arabic_name: "مريم",
    ayah_count: 98,
    juz: [
      {
        juz: 16,
        from_ayah: 1,
        to_ayah: 98
      }
    ]
  },
  {
    number: 20,
    name: "Ta-Ha",
    arabic_name: "طه",
    ayah_count: 135,
    juz: [
      {
        juz: 16,
        from_ayah: 1,
        to_ayah: 135
      }
    ]
  },
  {
    number: 21,
    name: "Al-Anbiya",
    arabic_name: "الأنبياء",
    ayah_count: 112,
    juz: [
      {
        juz: 17,
        from_ayah: 1,
        to_ayah: 112
      }
    ]
  },
  {
    number: 22,
    name: "Al-Hajj",
    arabic_name: "الحج",
    ayah_count: 78,
    juz: [
      {
        juz: 17,
        from_ayah: 1,
        to_ayah: 78
      }
    ]
  },
  {
    number: 23,
    name: "Al-Mu'minun",
    arabic_name: "المؤمنون",
    ayah_count: 118,
    juz: [
      {
        juz: 18,
        from_ayah: 1,
        to_ayah: 118
      }
    ]
  },
  {
    number: 24,
    name: "An-Nur",
    arabic_name: "النور",
    ayah_count: 64,
    juz: [
      {
        juz: 18,
        from_ayah: 1,
        to_ayah: 64
      }
    ]
  },
  {
    number: 25,
    name: "Al-Furqan",
    arabic_name: "الفرقان",
    ayah_count: 77,
    juz: [
      {
        juz: 18,
        from_ayah: 1,
        to_ayah: 20
      },
      {
        juz: 19,
        from_ayah: 21,
        to_ayah: 77
      }
    ]
  },
  {
    number: 26,
    name: "Ash-Shu'ara",
    arabic_name: "الشعراء",
    ayah_count: 227,
    juz: [
      {
        juz: 19,
        from_ayah: 1,
        to_ayah: 227
      }
    ]
  },
  {
    number: 27,
    name: "An-Naml",
    arabic_name: "النمل",
    ayah_count: 93,
    juz: [
      {
        juz: 19,
        from_ayah: 1,
        to_ayah: 55
      },
      {
        juz: 20,
        from_ayah: 56,
        to_ayah: 93
      }
    ]
  },
  {
    number: 28,
    name: "Al-Qasas",
    arabic_name: "القصص",
    ayah_count: 88,
    juz: [
      {
        juz: 20,
        from_ayah: 1,
        to_ayah: 88
      }
    ]
  },
  {
    number: 29,
    name: "Al-Ankabut",
    arabic_name: "العنكبوت",
    ayah_count: 69,
    juz: [
      {
        juz: 20,
        from_ayah: 1,
        to_ayah: 45
      },
      {
        juz: 21,
        from_ayah: 46,
        to_ayah: 69
      }
    ]
  },
  {
    number: 30,
    name: "Ar-Rum",
    arabic_name: "الروم",
    ayah_count: 60,
    juz: [
      {
        juz: 21,
        from_ayah: 1,
        to_ayah: 60
      }
    ]
  },
  {
    number: 31,
    name: "Luqman",
    arabic_name: "لقمان",
    ayah_count: 34,
    juz: [
      {
        juz: 21,
        from_ayah: 1,
        to_ayah: 34
      }
    ]
  },
  {
    number: 32,
    name: "As-Sajdah",
    arabic_name: "السجدة",
    ayah_count: 30,
    juz: [
      {
        juz: 21,
        from_ayah: 1,
        to_ayah: 30
      }
    ]
  },
  {
    number: 33,
    name: "Al-Ahzab",
    arabic_name: "الأحزاب",
    ayah_count: 73,
    juz: [
      {
        juz: 21,
        from_ayah: 1,
        to_ayah: 30
      },
      {
        juz: 22,
        from_ayah: 31,
        to_ayah: 73
      }
    ]
  },
  {
    number: 34,
    name: "Saba",
    arabic_name: "سبأ",
    ayah_count: 54,
    juz: [
      {
        juz: 22,
        from_ayah: 1,
        to_ayah: 54
      }
    ]
  },
  {
    number: 35,
    name: "Fatir",
    arabic_name: "فاطر",
    ayah_count: 45,
    juz: [
      {
        juz: 22,
        from_ayah: 1,
        to_ayah: 45
      }
    ]
  },
  {
    number: 36,
    name: "Ya-Sin",
    arabic_name: "يس",
    ayah_count: 83,
    juz: [
      {
        juz: 22,
        from_ayah: 1,
        to_ayah: 43
      },
      {
        juz: 23,
        from_ayah: 44,
        to_ayah: 83
      }
    ]
  },
  {
    number: 37,
    name: "As-Saffat",
    arabic_name: "الصافات",
    ayah_count: 182,
    juz: [
      {
        juz: 23,
        from_ayah: 1,
        to_ayah: 182
      }
    ]
  },
  {
    number: 38,
    name: "Sad",
    arabic_name: "ص",
    ayah_count: 88,
    juz: [
      {
        juz: 23,
        from_ayah: 1,
        to_ayah: 88
      }
    ]
  },
  {
    number: 39,
    name: "Az-Zumar",
    arabic_name: "الزمر",
    ayah_count: 75,
    juz: [
      {
        juz: 23,
        from_ayah: 1,
        to_ayah: 31
      },
      {
        juz: 24,
        from_ayah: 32,
        to_ayah: 75
      }
    ]
  },
  {
    number: 40,
    name: "Ghafir",
    arabic_name: "غافر",
    ayah_count: 85,
    juz: [
      {
        juz: 24,
        from_ayah: 1,
        to_ayah: 85
      }
    ]
  },
  {
    number: 41,
    name: "Fussilat",
    arabic_name: "فصلت",
    ayah_count: 54,
    juz: [
      {
        juz: 24,
        from_ayah: 1,
        to_ayah: 46
      },
      {
        juz: 25,
        from_ayah: 47,
        to_ayah: 54
      }
    ]
  },
  {
    number: 42,
    name: "Ash-Shura",
    arabic_name: "الشورى",
    ayah_count: 53,
    juz: [
      {
        juz: 25,
        from_ayah: 1,
        to_ayah: 53
      }
    ]
  },
  {
    number: 43,
    name: "Az-Zukhruf",
    arabic_name: "الزخرف",
    ayah_count: 89,
    juz: [
      {
        juz: 25,
        from_ayah: 1,
        to_ayah: 89
      }
    ]
  },
  {
    number: 44,
    name: "Ad-Dukhan",
    arabic_name: "الدخان",
    ayah_count: 59,
    juz: [
      {
        juz: 25,
        from_ayah: 1,
        to_ayah: 59
      }
    ]
  },
  {
    number: 45,
    name: "Al-Jathiyah",
    arabic_name: "الجاثية",
    ayah_count: 37,
    juz: [
      {
        juz: 25,
        from_ayah: 1,
        to_ayah: 37
      }
    ]
  },
  {
    number: 46,
    name: "Al-Ahqaf",
    arabic_name: "الأحقاف",
    ayah_count: 35,
    juz: [
      {
        juz: 25,
        from_ayah: 1,
        to_ayah: 1
      },
      {
        juz: 26,
        from_ayah: 2,
        to_ayah: 35
      }
    ]
  },
  {
    number: 47,
    name: "Muhammad",
    arabic_name: "محمد",
    ayah_count: 38,
    juz: [
      {
        juz: 26,
        from_ayah: 1,
        to_ayah: 38
      }
    ]
  },
  {
    number: 48,
    name: "Al-Fath",
    arabic_name: "الفتح",
    ayah_count: 29,
    juz: [
      {
        juz: 26,
        from_ayah: 1,
        to_ayah: 29
      }
    ]
  },
  {
    number: 49,
    name: "Al-Hujurat",
    arabic_name: "الحجرات",
    ayah_count: 18,
    juz: [
      {
        juz: 26,
        from_ayah: 1,
        to_ayah: 18
      }
    ]
  },
  {
    number: 50,
    name: "Qaf",
    arabic_name: "ق",
    ayah_count: 45,
    juz: [
      {
        juz: 26,
        from_ayah: 1,
        to_ayah: 45
      }
    ]
  },
  {
    number: 51,
    name: "Adh-Dhariyat",
    arabic_name: "الذاريات",
    ayah_count: 60,
    juz: [
      {
        juz: 26,
        from_ayah: 1,
        to_ayah: 30
      },
      {
        juz: 27,
        from_ayah: 31,
        to_ayah: 60
      }
    ]
  },
  {
    number: 52,
    name: "At-Tur",
    arabic_name: "الطور",
    ayah_count: 49,
    juz: [
      {
        juz: 27,
        from_ayah: 1,
        to_ayah: 49
      }
    ]
  },
  {
    number: 53,
    name: "An-Najm",
    arabic_name: "النجم",
    ayah_count: 62,
    juz: [
      {
        juz: 27,
        from_ayah: 1,
        to_ayah: 62
      }
    ]
  },
  {
    number: 54,
    name: "Al-Qamar",
    arabic_name: "القمر",
    ayah_count: 55,
    juz: [
      {
        juz: 27,
        from_ayah: 1,
        to_ayah: 55
      }
    ]
  },
  {
    number: 55,
    name: "Ar-Rahman",
    arabic_name: "الرحمن",
    ayah_count: 78,
    juz: [
      {
        juz: 27,
        from_ayah: 1,
        to_ayah: 78
      }
    ]
  },
  {
    number: 56,
    name: "Al-Waqi'ah",
    arabic_name: "الواقعة",
    ayah_count: 96,
    juz: [
      {
        juz: 27,
        from_ayah: 1,
        to_ayah: 96
      }
    ]
  },
  {
    number: 57,
    name: "Al-Hadid",
    arabic_name: "الحديد",
    ayah_count: 29,
    juz: [
      {
        juz: 27,
        from_ayah: 1,
        to_ayah: 29
      }
    ]
  },
  {
    number: 58,
    name: "Al-Mujadila",
    arabic_name: "المجادلة",
    ayah_count: 22,
    juz: [
      {
        juz: 27,
        from_ayah: 1,
        to_ayah: 1
      },
      {
        juz: 28,
        from_ayah: 2,
        to_ayah: 22
      }
    ]
  },
  {
    number: 59,
    name: "Al-Hashr",
    arabic_name: "الحشر",
    ayah_count: 24,
    juz: [
      {
        juz: 28,
        from_ayah: 1,
        to_ayah: 24
      }
    ]
  },
  {
    number: 60,
    name: "Al-Mumtahanah",
    arabic_name: "الممتحنة",
    ayah_count: 13,
    juz: [
      {
        juz: 28,
        from_ayah: 1,
        to_ayah: 13
      }
    ]
  },
  {
    number: 61,
    name: "As-Saff",
    arabic_name: "الصف",
    ayah_count: 14,
    juz: [
      {
        juz: 28,
        from_ayah: 1,
        to_ayah: 14
      }
    ]
  },
  {
    number: 62,
    name: "Al-Jumu'ah",
    arabic_name: "الجمعة",
    ayah_count: 11,
    juz: [
      {
        juz: 28,
        from_ayah: 1,
        to_ayah: 11
      }
    ]
  },
  {
    number: 63,
    name: "Al-Munafiqun",
    arabic_name: "المنافقون",
    ayah_count: 11,
    juz: [
      {
        juz: 28,
        from_ayah: 1,
        to_ayah: 11
      }
    ]
  },
  {
    number: 64,
    name: "At-Taghabun",
    arabic_name: "التغابن",
    ayah_count: 18,
    juz: [
      {
        juz: 28,
        from_ayah: 1,
        to_ayah: 18
      }
    ]
  },
  {
    number: 65,
    name: "At-Talaq",
    arabic_name: "الطلاق",
    ayah_count: 12,
    juz: [
      {
        juz: 28,
        from_ayah: 1,
        to_ayah: 12
      }
    ]
  },
  {
    number: 66,
    name: "At-Tahrim",
    arabic_name: "التحريم",
    ayah_count: 12,
    juz: [
      {
        juz: 28,
        from_ayah: 1,
        to_ayah: 12
      }
    ]
  },
  {
    number: 67,
    name: "Al-Mulk",
    arabic_name: "الملك",
    ayah_count: 30,
    juz: [
      {
        juz: 29,
        from_ayah: 1,
        to_ayah: 30
      }
    ]
  },
  {
    number: 68,
    name: "Al-Qalam",
    arabic_name: "القلم",
    ayah_count: 52,
    juz: [
      {
        juz: 29,
        from_ayah: 1,
        to_ayah: 52
      }
    ]
  },
  {
    number: 69,
    name: "Al-Haqqah",
    arabic_name: "الحاقة",
    ayah_count: 52,
    juz: [
      {
        juz: 29,
        from_ayah: 1,
        to_ayah: 52
      }
    ]
  },
  {
    number: 70,
    name: "Al-Ma'arij",
    arabic_name: "المعارج",
    ayah_count: 44,
    juz: [
      {
        juz: 29,
        from_ayah: 1,
        to_ayah: 44
      }
    ]
  },
  {
    number: 71,
    name: "Nuh",
    arabic_name: "نوح",
    ayah_count: 28,
    juz: [
      {
        juz: 29,
        from_ayah: 1,
        to_ayah: 28
      }
    ]
  },
  {
    number: 72,
    name: "Al-Jinn",
    arabic_name: "الجن",
    ayah_count: 28,
    juz: [
      {
        juz: 29,
        from_ayah: 1,
        to_ayah: 28
      }
    ]
  },
  {
    number: 73,
    name: "Al-Muzzammil",
    arabic_name: "المزمل",
    ayah_count: 20,
    juz: [
      {
        juz: 29,
        from_ayah: 1,
        to_ayah: 20
      }
    ]
  },
  {
    number: 74,
    name: "Al-Muddathir",
    arabic_name: "المدثر",
    ayah_count: 56,
    juz: [
      {
        juz: 29,
        from_ayah: 1,
        to_ayah: 56
      }
    ]
  },
  {
    number: 75,
    name: "Al-Qiyamah",
    arabic_name: "القيامة",
    ayah_count: 40,
    juz: [
      {
        juz: 29,
        from_ayah: 1,
        to_ayah: 40
      }
    ]
  },
  {
    number: 76,
    name: "Al-Insan",
    arabic_name: "الإنسان",
    ayah_count: 31,
    juz: [
      {
        juz: 29,
        from_ayah: 1,
        to_ayah: 31
      }
    ]
  },
  {
    number: 77,
    name: "Al-Mursalat",
    arabic_name: "المرسلات",
    ayah_count: 50,
    juz: [
      {
        juz: 29,
        from_ayah: 1,
        to_ayah: 50
      }
    ]
  },
  {
    number: 78,
    name: "An-Naba",
    arabic_name: "النبأ",
    ayah_count: 40,
    juz: [
      {
        juz: 30,
        from_ayah: 1,
        to_ayah: 40
      }
    ]
  },
  {
    number: 79,
    name: "An-Nazi'at",
    arabic_name: "النازعات",
    ayah_count: 46,
    juz: [
      {
        juz: 30,
        from_ayah: 1,
        to_ayah: 46
      }
    ]
  },
  {
    number: 80,
    name: "Abasa",
    arabic_name: "عبس",
    ayah_count: 42,
    juz: [
      {
        juz: 30,
        from_ayah: 1,
        to_ayah: 42
      }
    ]
  },
  {
    number: 81,
    name: "At-Takwir",
    arabic_name: "التكوير",
    ayah_count: 29,
    juz: [
      {
        juz: 30,
        from_ayah: 1,
        to_ayah: 29
      }
    ]
  },
  {
    number: 82,
    name: "Al-Infitar",
    arabic_name: "الإنفطار",
    ayah_count: 19,
    juz: [
      {
        juz: 30,
        from_ayah: 1,
        to_ayah: 19
      }
    ]
  },
  {
    number: 83,
    name: "Al-Mutaffifin",
    arabic_name: "المطففين",
    ayah_count: 36,
    juz: [
      {
        juz: 30,
        from_ayah: 1,
        to_ayah: 36
      }
    ]
  },
  {
    number: 84,
    name: "Al-Inshiqaq",
    arabic_name: "الإنشقاق",
    ayah_count: 25,
    juz: [
      {
        juz: 30,
        from_ayah: 1,
        to_ayah: 25
      }
    ]
  },
  {
    number: 85,
    name: "Al-Buruj",
    arabic_name: "البروج",
    ayah_count: 22,
    juz: [
      {
        juz: 30,
        from_ayah: 1,
        to_ayah: 22
      }
    ]
  },
  {
    number: 86,
    name: "At-Tariq",
    arabic_name: "الطارق",
    ayah_count: 17,
    juz: [
      {
        juz: 30,
        from_ayah: 1,
        to_ayah: 17
      }
    ]
  },
  {
    number: 87,
    name: "Al-A'la",
    arabic_name: "الأعلى",
    ayah_count: 19,
    juz: [
      {
        juz: 30,
        from_ayah: 1,
        to_ayah: 19
      }
    ]
  },
  {
    number: 88,
    name: "Al-Ghashiyah",
    arabic_name: "الغاشية",
    ayah_count: 26,
    juz: [
      {
        juz: 30,
        from_ayah: 1,
        to_ayah: 26
      }
    ]
  },
  {
    number: 89,
    name: "Al-Fajr",
    arabic_name: "الفجر",
    ayah_count: 30,
    juz: [
      {
        juz: 30,
        from_ayah: 1,
        to_ayah: 30
      }
    ]
  },
  {
    number: 90,
    name: "Al-Balad",
    arabic_name: "البلد",
    ayah_count: 20,
    juz: [
      {
        juz: 30,
        from_ayah: 1,
        to_ayah: 20
      }
    ]
  },
  {
    number: 91,
    name: "Ash-Shams",
    arabic_name: "الشمس",
    ayah_count: 15,
    juz: [
      {
        juz: 30,
        from_ayah: 1,
        to_ayah: 15
      }
    ]
  },
  {
    number: 92,
    name: "Al-Layl",
    arabic_name: "الليل",
    ayah_count: 21,
    juz: [
      {
        juz: 30,
        from_ayah: 1,
        to_ayah: 21
      }
    ]
  },
  {
    number: 93,
    name: "Ad-Duha",
    arabic_name: "الضحى",
    ayah_count: 11,
    juz: [
      {
        juz: 30,
        from_ayah: 1,
        to_ayah: 11
      }
    ]
  },
  {
    number: 94,
    name: "Ash-Sharh",
    arabic_name: "الشرح",
    ayah_count: 8,
    juz: [
      {
        juz: 30,
        from_ayah: 1,
        to_ayah: 8
      }
    ]
  },
  {
    number: 95,
    name: "At-Tin",
    arabic_name: "التين",
    ayah_count: 8,
    juz: [
      {
        juz: 30,
        from_ayah: 1,
        to_ayah: 8
      }
    ]
  },
  {
    number: 96,
    name: "Al-Alaq",
    arabic_name: "العلق",
    ayah_count: 19,
    juz: [
      {
        juz: 30,
        from_ayah: 1,
        to_ayah: 19
      }
    ]
  },
  {
    number: 97,
    name: "Al-Qadr",
    arabic_name: "القدر",
    ayah_count: 5,
    juz: [
      {
        juz: 30,
        from_ayah: 1,
        to_ayah: 5
      }
    ]
  },
  {
    number: 98,
    name: "Al-Bayyinah",
    arabic_name: "البينة",
    ayah_count: 8,
    juz: [
      {
        juz: 30,
        from_ayah: 1,
        to_ayah: 8
      }
    ]
  },
  {
    number: 99,
    name: "Az-Zalzalah",
    arabic_name: "الزلزلة",
    ayah_count: 8,
    juz: [
      {
        juz: 30,
        from_ayah: 1,
        to_ayah: 8
      }
    ]
  },
  {
    number: 100,
    name: "Al-Adiyat",
    arabic_name: "العاديات",
    ayah_count: 11,
    juz: [
      {
        juz: 30,
        from_ayah: 1,
        to_ayah: 11
      }
    ]
  },
  {
    number: 101,
    name: "Al-Qari'ah",
    arabic_name: "القارعة",
    ayah_count: 11,
    juz: [
      {
        juz: 30,
        from_ayah: 1,
        to_ayah: 11
      }
    ]
  },
  {
    number: 102,
    name: "At-Takathur",
    arabic_name: "التكاثر",
    ayah_count: 8,
    juz: [
      {
        juz: 30,
        from_ayah: 1,
        to_ayah: 8
      }
    ]
  },
  {
    number: 103,
    name: "Al-Asr",
    arabic_name: "العصر",
    ayah_count: 3,
    juz: [
      {
        juz: 30,
        from_ayah: 1,
        to_ayah: 3
      }
    ]
  },
  {
    number: 104,
    name: "Al-Humazah",
    arabic_name: "الهمزة",
    ayah_count: 9,
    juz: [
      {
        juz: 30,
        from_ayah: 1,
        to_ayah: 9
      }
    ]
  },
  {
    number: 105,
    name: "Al-Fil",
    arabic_name: "الفيل",
    ayah_count: 5,
    juz: [
      {
        juz: 30,
        from_ayah: 1,
        to_ayah: 5
      }
    ]
  },
  {
    number: 106,
    name: "Quraysh",
    arabic_name: "قريش",
    ayah_count: 4,
    juz: [
      {
        juz: 30,
        from_ayah: 1,
        to_ayah: 4
      }
    ]
  },
  {
    number: 107,
    name: "Al-Ma'un",
    arabic_name: "الماعون",
    ayah_count: 7,
    juz: [
      {
        juz: 30,
        from_ayah: 1,
        to_ayah: 7
      }
    ]
  },
  {
    number: 108,
    name: "Al-Kawthar",
    arabic_name: "الكوثر",
    ayah_count: 3,
    juz: [
      {
        juz: 30,
        from_ayah: 1,
        to_ayah: 3
      }
    ]
  },
  {
    number: 109,
    name: "Al-Kafirun",
    arabic_name: "الكافرون",
    ayah_count: 6,
    juz: [
      {
        juz: 30,
        from_ayah: 1,
        to_ayah: 6
      }
    ]
  },
  {
    number: 110,
    name: "An-Nasr",
    arabic_name: "النصر",
    ayah_count: 3,
    juz: [
      {
        juz: 30,
        from_ayah: 1,
        to_ayah: 3
      }
    ]
  },
  {
    number: 111,
    name: "Al-Masad",
    arabic_name: "المسد",
    ayah_count: 5,
    juz: [
      {
        juz: 30,
        from_ayah: 1,
        to_ayah: 5
      }
    ]
  },
  {
    number: 112,
    name: "Al-Ikhlas",
    arabic_name: "الإخلاص",
    ayah_count: 4,
    juz: [
      {
        juz: 30,
        from_ayah: 1,
        to_ayah: 4
      }
    ]
  },
  {
    number: 113,
    name: "Al-Falaq",
    arabic_name: "الفلق",
    ayah_count: 5,
    juz: [
      {
        juz: 30,
        from_ayah: 1,
        to_ayah: 5
      }
    ]
  },
  {
    number: 114,
    name: "An-Nas",
    arabic_name: "الناس",
    ayah_count: 6,
    juz: [
      {
        juz: 30,
        from_ayah: 1,
        to_ayah: 6
      }
    ]
  }
]

export const quraa: Quraa = {
  "1": {
    subfolder: "Abdul_Basit_Murattal_64kbps",
    name: "Abdul Basit Murattal",
    arabicName: "عبد الباسط عبد الصمد (مرتل)",
    bitrate: "64kbps"
  },
  "2": {
    subfolder: "Abdul_Basit_Murattal_192kbps",
    name: "Abdul Basit Murattal",
    arabicName: "عبد الباسط عبد الصمد (مرتل)",
    bitrate: "192kbps"
  },
  "3": {
    subfolder: "Abdul_Basit_Mujawwad_128kbps",
    name: "Abdul Basit Mujawwad",
    arabicName: "عبد الباسط عبد الصمد (مجود)",
    bitrate: "128kbps"
  },
  "4": {
    subfolder: "Abdullah_Basfar_32kbps",
    name: "Abdullah Basfar",
    arabicName: "عبد الله بصفر",
    bitrate: "32kbps"
  },
  "5": {
    subfolder: "Abdullah_Basfar_64kbps",
    name: "Abdullah Basfar",
    arabicName: "عبد الله بصفر",
    bitrate: "64kbps"
  },
  "6": {
    subfolder: "Abdullah_Basfar_192kbps",
    name: "Abdullah Basfar",
    arabicName: "عبد الله بصفر",
    bitrate: "192kbps"
  },
  "7": {
    subfolder: "Abdurrahmaan_As-Sudais_64kbps",
    name: "Abdurrahmaan As-Sudais",
    arabicName: "عبد الرحمن السديس",
    bitrate: "64kbps"
  },
  "8": {
    subfolder: "Abdurrahmaan_As-Sudais_192kbps",
    name: "Abdurrahmaan As-Sudais",
    arabicName: "عبد الرحمن السديس",
    bitrate: "192kbps"
  },
  "9": {
    subfolder: "AbdulSamad_64kbps_QuranExplorer.Com",
    name: "AbdulSamad QuranExplorer.Com",
    arabicName: "عبد الباسط عبد الصمد",
    bitrate: "64kbps"
  },
  "10": {
    subfolder: "Abu_Bakr_Ash-Shaatree_64kbps",
    name: "Abu Bakr Ash-Shaatree",
    arabicName: "أبو بكر الشاطري",
    bitrate: "64kbps"
  },
  "11": {
    subfolder: "Abu_Bakr_Ash-Shaatree_128kbps",
    name: "Abu Bakr Ash-Shaatree",
    arabicName: "أبو بكر الشاطري",
    bitrate: "128kbps"
  },
  "12": {
    subfolder: "Ahmed_ibn_Ali_al-Ajamy_64kbps_QuranExplorer.Com",
    name: "Ahmed ibn Ali al-Ajamy QuranExplorer.Com",
    arabicName: "أحمد بن علي العجمي",
    bitrate: "64kbps"
  },
  "13": {
    subfolder: "Ahmed_ibn_Ali_al-Ajamy_128kbps_ketaballah.net",
    name: "Ahmed ibn Ali al-Ajamy KetabAllah.Net",
    arabicName: "أحمد بن علي العجمي",
    bitrate: "128kbps"
  },
  "14": {
    subfolder: "Alafasy_64kbps",
    name: "Alafasy",
    arabicName: "مشاري بن راشد العفاسي",
    bitrate: "64kbps"
  },
  "15": {
    subfolder: "Alafasy_128kbps",
    name: "Alafasy",
    arabicName: "مشاري بن راشد العفاسي",
    bitrate: "128kbps"
  },
  "16": {
    subfolder: "Ghamadi_40kbps",
    name: "Ghamadi",
    arabicName: "سعد الغامدي",
    bitrate: "40kbps"
  },
  "17": {
    subfolder: "Hani_Rifai_64kbps",
    name: "Hani Rifai",
    arabicName: "هاني الرفاعي",
    bitrate: "64kbps"
  },
  "18": {
    subfolder: "Hani_Rifai_192kbps",
    name: "Hani Rifai",
    arabicName: "هاني الرفاعي",
    bitrate: "192kbps"
  },
  "19": {
    subfolder: "Husary_64kbps",
    name: "Husary",
    arabicName: "محمود خليل الحصري",
    bitrate: "64kbps"
  },
  "20": {
    subfolder: "Husary_128kbps",
    name: "Husary",
    arabicName: "محمود خليل الحصري",
    bitrate: "128kbps"
  },
  "21": {
    subfolder: "Husary_Mujawwad_64kbps",
    name: "Husary Mujawwad",
    arabicName: "محمود خليل الحصري (مجود)",
    bitrate: "64kbps"
  },
  "22": {
    subfolder: "Husary_128kbps_Mujawwad",
    name: "Husary Mujawwad",
    arabicName: "محمود خليل الحصري (مجود)",
    bitrate: "128kbps"
  },
  "23": {
    subfolder: "Hudhaify_32kbps",
    name: "Hudhaify",
    arabicName: "علي بن عبد الرحمن الحذيفي",
    bitrate: "32kbps"
  },
  "24": {
    subfolder: "Hudhaify_64kbps",
    name: "Hudhaify",
    arabicName: "علي بن عبد الرحمن الحذيفي",
    bitrate: "64kbps"
  },
  "25": {
    subfolder: "Hudhaify_128kbps",
    name: "Hudhaify",
    arabicName: "علي بن عبد الرحمن الحذيفي",
    bitrate: "128kbps"
  },
  "26": {
    subfolder: "Ibrahim_Akhdar_32kbps",
    name: "Ibrahim Akhdar",
    arabicName: "إبراهيم الأخضر",
    bitrate: "32kbps"
  },
  "27": {
    subfolder: "Ibrahim_Akhdar_64kbps",
    name: "Ibrahim Akhdar",
    arabicName: "إبراهيم الأخضر",
    bitrate: "64kbps"
  },
  "28": {
    subfolder: "Maher_AlMuaiqly_64kbps",
    name: "Maher Al Muaiqly",
    arabicName: "ماهر المعيقلي",
    bitrate: "64kbps"
  },
  "29": {
    subfolder: "MaherAlMuaiqly128kbps",
    name: "Maher Al Muaiqly",
    arabicName: "ماهر المعيقلي",
    bitrate: "128kbps"
  },
  "30": {
    subfolder: "Menshawi_16kbps",
    name: "Menshawi",
    arabicName: "محمد صديق المنشاوي",
    bitrate: "16kbps"
  },
  "31": {
    subfolder: "Menshawi_32kbps",
    name: "Menshawi",
    arabicName: "محمد صديق المنشاوي",
    bitrate: "32kbps"
  },
  "32": {
    subfolder: "Minshawy_Mujawwad_64kbps",
    name: "Minshawy Mujawwad",
    arabicName: "محمد صديق المنشاوي (مجود)",
    bitrate: "64kbps"
  },
  "33": {
    subfolder: "Minshawy_Mujawwad_192kbps",
    name: "Minshawy Mujawwad",
    arabicName: "محمد صديق المنشاوي (مجود)",
    bitrate: "192kbps"
  },
  "34": {
    subfolder: "Minshawy_Murattal_128kbps",
    name: "Minshawy Murattal",
    arabicName: "محمد صديق المنشاوي (مرتل)",
    bitrate: "128kbps"
  },
  "35": {
    subfolder: "Mohammad_al_Tablaway_64kbps",
    name: "Mohammad al Tablaway",
    arabicName: "محمد الطبلاوي",
    bitrate: "64kbps"
  },
  "36": {
    subfolder: "Mohammad_al_Tablaway_128kbps",
    name: "Mohammad al Tablaway",
    arabicName: "محمد الطبلاوي",
    bitrate: "128kbps"
  },
  "37": {
    subfolder: "Muhammad_Ayyoub_128kbps",
    name: "Muhammad Ayyoub",
    arabicName: "محمد أيوب",
    bitrate: "128kbps"
  },
  "38": {
    subfolder: "Muhammad_Ayyoub_64kbps",
    name: "Muhammad Ayyoub",
    arabicName: "محمد أيوب",
    bitrate: "64kbps"
  },
  "39": {
    subfolder: "Muhammad_Ayyoub_32kbps",
    name: "Muhammad Ayyoub",
    arabicName: "محمد أيوب",
    bitrate: "32kbps"
  },
  "40": {
    subfolder: "Muhammad_Jibreel_64kbps",
    name: "Muhammad Jibreel",
    arabicName: "محمد جبريل",
    bitrate: "64kbps"
  },
  "41": {
    subfolder: "Muhammad_Jibreel_128kbps",
    name: "Muhammad Jibreel",
    arabicName: "محمد جبريل",
    bitrate: "128kbps"
  },
  "42": {
    subfolder: "Mustafa_Ismail_48kbps",
    name: "Mustafa Ismail",
    arabicName: "مصطفى إسماعيل",
    bitrate: "48kbps"
  },
  "43": {
    subfolder: "Saood_ash-Shuraym_64kbps",
    name: "Saood bin Ibraaheem Ash-Shuraym",
    arabicName: "سعود الشريم",
    bitrate: "64kbps"
  },
  "44": {
    subfolder: "Saood_ash-Shuraym_128kbps",
    name: "Saood bin Ibraaheem Ash-Shuraym",
    arabicName: "سعود الشريم",
    bitrate: "128kbps"
  },
  "45": {
    subfolder: "English/Sahih_Intnl_Ibrahim_Walk_192kbps",
    name: "(English) Translated by Sahih International Recited by Ibrahim Walk",
    arabicName: "ترجمة إنجليزية - صحيح انترناشونال",
    bitrate: "192kbps"
  },
  "46": {
    subfolder: "MultiLanguage/Basfar_Walk_192kbps",
    name: "MultiLanguage/Basfar Walk",
    arabicName: "متعدد اللغات - عبد الله بصفر",
    bitrate: "192kbps"
  },
  "47": {
    subfolder: "translations/Makarem_Kabiri_16Kbps",
    name: "(Persian) Translated by Makarem Recited by Kabiri",
    arabicName: "ترجمة فارسية - مكارم الشيرازي",
    bitrate: "64Kbps"
  },
  "48": {
    subfolder: "translations/Fooladvand_Hedayatfar_40Kbps",
    name: "(Persian) Translated by Fooladvand Recited by Hedayatfar",
    arabicName: "ترجمة فارسية - فولادوند",
    bitrate: "64Kbps"
  },
  "49": {
    subfolder: "Parhizgar_48kbps",
    name: "Parhizgar",
    arabicName: "شهریار پرهیزگار",
    bitrate: "64Kbps"
  },
  "50": {
    subfolder: "translations/azerbaijani/balayev",
    name: "Balayev",
    arabicName: "ترجمة أذربيجانية - بالاييف",
    bitrate: "64Kbps"
  },
  "51": {
    subfolder: "Salaah_AbdulRahman_Bukhatir_128kbps",
    name: "Salaah AbdulRahman Bukhatir",
    arabicName: "صلاح عبد الرحمن بخاطر",
    bitrate: "128kbps"
  },
  "52": {
    subfolder: "Muhsin_Al_Qasim_192kbps",
    name: "Muhsin Al Qasim",
    arabicName: "محسن القاسم",
    bitrate: "192kbps"
  },
  "53": {
    subfolder: "Abdullaah_3awwaad_Al-Juhaynee_128kbps",
    name: "Abdullaah 3awwaad Al-Juhaynee",
    arabicName: "عبد الله عواد الجهني",
    bitrate: "128kbps"
  },
  "54": {
    subfolder: "Salah_Al_Budair_128kbps",
    name: "Salah Al Budair",
    arabicName: "صلاح البدير",
    bitrate: "128kbps"
  },
  "55": {
    subfolder: "Abdullah_Matroud_128kbps",
    name: "Abdullah Matroud",
    arabicName: "عبد الله المطرود",
    bitrate: "128kbps"
  },
  "56": {
    subfolder: "Ahmed_Neana_128kbps",
    name: "Ahmed Neana",
    arabicName: "أحمد نعينع",
    bitrate: "128kbps"
  },
  "57": {
    subfolder: "Muhammad_AbdulKareem_128kbps",
    name: "Muhammad AbdulKareem",
    arabicName: "محمد عبد الكريم",
    bitrate: "128kbps"
  },
  "58": {
    subfolder: "khalefa_al_tunaiji_64kbps",
    name: "Khalefa Al-Tunaiji",
    arabicName: "خليفة الطنيجي",
    bitrate: "64kbps"
  },
  "59": {
    subfolder: "mahmoud_ali_al_banna_32kbps",
    name: "Mahmoud Ali Al-Banna",
    arabicName: "محمود علي البنا",
    bitrate: "32kbps"
  },
  "60": {
    subfolder: "warsh/warsh_ibrahim_aldosary_128kbps",
    name: "(Warsh) Ibrahim Al-Dosary",
    arabicName: "إبراهيم الدوسري (ورش)",
    bitrate: "128kbps"
  },
  "61": {
    subfolder: "warsh/warsh_yassin_al_jazaery_64kbps",
    name: "(Warsh) Yassin Al-Jazaery",
    arabicName: "ياسين الجزائري (ورش)",
    bitrate: "64kbps"
  },
  "62": {
    subfolder: "warsh/warsh_Abdul_Basit_128kbps",
    name: "(Warsh) Abdul Basit",
    arabicName: "عبد الباسط عبد الصمد (ورش)",
    bitrate: "128kbps"
  },
  "63": {
    subfolder: "translations/urdu_shamshad_ali_khan_46kbps",
    name: "(Urdu) Shamshad Ali Khan",
    arabicName: "ترجمة أردية - شمشاد علي خان",
    bitrate: "46kbps"
  },
  "64": {
    subfolder: "Karim_Mansoori_40kbps",
    name: "Karim Mansoori (Iran)",
    arabicName: "كريم منصوري",
    bitrate: "40kbps"
  },
  "65": {
    subfolder: "Husary_Muallim_128kbps",
    name: "Husary (Muallim)",
    arabicName: "الحصري (المعلم)",
    bitrate: "128kbps"
  },
  "66": {
    subfolder: "Khaalid_Abdullaah_al-Qahtaanee_192kbps",
    name: "Khalid Abdullah al-Qahtanee",
    arabicName: "خالد عبد الله القحطاني",
    bitrate: "192kbps"
  },
  "67": {
    subfolder: "Yasser_Ad-Dussary_128kbps",
    name: "Yasser Ad-Dussary",
    arabicName: "ياسر الدوسري",
    bitrate: "128kbps"
  },
  "68": {
    subfolder: "Nasser_Alqatami_128kbps",
    name: "Nasser Alqatami",
    arabicName: "ناصر القطامي",
    bitrate: "128kbps"
  },
  "69": {
    subfolder: "Ali_Hajjaj_AlSuesy_128kbps",
    name: "Ali Hajjaj AlSuesy",
    arabicName: "علي حجاج السويسي",
    bitrate: "128kbps"
  },
  "70": {
    subfolder: "Sahl_Yassin_128kbps",
    name: "Sahl Yassin",
    arabicName: "سهل ياسين",
    bitrate: "128kbps"
  },
  "71": {
    subfolder: "ahmed_ibn_ali_al_ajamy_128kbps",
    name: "Ahmed Ibn Ali Al Ajamy",
    arabicName: "أحمد بن علي العجمي",
    bitrate: "128kbps"
  },
  "72": {
    subfolder: "translations/besim_korkut_ajet_po_ajet",
    name: "Besim Korkut (Bosnian)",
    arabicName: "ترجمة بوسنية - بسيم كوركوت",
    bitrate: "128kbps"
  },
  "73": {
    subfolder: "aziz_alili_128kbps",
    name: "Aziz Alili",
    arabicName: "عزيز عليلي",
    bitrate: "128kbps"
  },
  "74": {
    subfolder: "Yaser_Salamah_128kbps",
    name: "Yaser Salamah",
    arabicName: "ياسر سلامة",
    bitrate: "128kbps"
  },
  "75": {
    subfolder: "Akram_AlAlaqimy_128kbps",
    name: "Akram Al Alaqimy",
    arabicName: "أكرم العلاقمي",
    bitrate: "128kbps"
  },
  "76": {
    subfolder: "Ali_Jaber_64kbps",
    name: "Ali Jaber",
    arabicName: "علي جابر",
    bitrate: "64kbps"
  },
  "77": {
    subfolder: "Fares_Abbad_64kbps",
    name: "Fares Abbad",
    arabicName: "فارس عباد",
    bitrate: "64kbps"
  },
  "78": {
    subfolder: "translations/urdu_farhat_hashmi",
    name: "Farhat Hashmi (Urdu word for word translation)",
    arabicName: "ترجمة أردية - فرحت هاشمي",
    bitrate: "32kbps"
  },
  "79": {
    subfolder: "Ayman_Sowaid_64kbps",
    name: "Ayman Sowaid",
    arabicName: "أيمن سويد",
    bitrate: "64kbps"
  }
}
