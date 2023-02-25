const indices = [0,1,2,2,3,0,4,5,2,2,1,4,6,3,2,2,5,6,7,8,9,9,10,7,11,12,9,9,8,11,13,10,9,9,12,13,14,15,16,16,17,14,18,19,16,16,15,18,20,17,16,16,19,20,21,22,23,23,24,21,25,26,23,23,22,25,27,24,23,23,26,27,28,29,30,30,31,28,32,33,30,30,29,32,34,31,30,30,33,34,7,10,35,35,36,7,13,37,35,35,10,13,38,36,35,35,37,38,39,40,41,41,42,39,43,44,41,41,40,43,45,42,41,41,44,45,46,47,48,48,49,46,50,51,48,48,47,50,52,49,48,48,51,52,53,54,55,55,56,53,57,58,55,55,54,57,59,56,55,55,58,59,60,61,62,62,63,60,64,65,62,62,61,64,66,63,62,62,65,66,7,36,67,67,68,7,38,69,67,67,36,38,70,68,67,67,69,70,39,42,71,71,72,39,45,73,71,71,42,45,74,72,71,71,73,74,46,49,75,75,76,46,52,77,75,75,49,52,78,76,75,75,77,78,53,56,79,79,80,53,59,81,79,79,56,59,82,80,79,79,81,82,60,63,83,83,84,60,66,85,83,83,63,66,86,84,83,83,85,86,87,88,89,89,90,87,91,92,89,89,88,91,93,90,89,89,92,93,94,95,96,96,97,94,98,99,96,96,95,98,100,97,96,96,99,100,101,102,103,103,104,101,105,106,103,103,102,105,107,104,103,103,106,107,108,109,110,110,111,108,112,113,110,110,109,112,114,111,110,110,113,114,115,116,117,117,118,115,119,120,117,117,116,119,121,118,117,117,120,121,121,122,123,123,124,121,125,126,123,123,122,125,127,124,123,123,126,127,121,120,128,128,122,121,119,129,128,128,120,119,125,122,128,128,129,125,119,130,131,131,129,119,108,132,131,131,130,108,125,129,131,131,132,125,114,133,134,134,135,114,136,137,134,134,133,136,138,135,134,134,137,138,114,113,139,139,133,114,112,140,139,139,113,112,136,133,139,139,140,136,112,141,142,142,140,112,101,143,142,142,141,101,136,140,142,142,143,136,107,144,145,145,146,107,147,148,145,145,144,147,149,146,145,145,148,149,107,106,150,150,144,107,105,151,150,150,106,105,147,144,150,150,151,147,105,152,153,153,151,105,154,155,153,153,152,154,147,151,153,153,155,147,100,156,157,157,158,100,159,160,157,157,156,159,161,158,157,157,160,161,100,99,162,162,156,100,98,163,162,162,99,98,159,156,162,162,163,159,98,164,165,165,163,98,87,166,165,165,164,87,159,163,165,165,166,159,93,167,168,168,169,93,170,171,168,168,167,170,172,169,168,168,171,172,93,92,173,173,167,93,91,174,173,173,92,91,170,167,173,173,174,170,91,175,176,176,174,91,115,177,176,176,175,115,170,174,176,176,177,170,86,178,179,179,180,86,119,116,179,179,178,119,115,180,179,179,116,115,86,85,181,181,178,86,66,182,181,181,85,66,119,178,181,181,182,119,66,183,184,184,182,66,108,130,184,184,183,108,119,182,184,184,130,119,82,185,186,186,187,82,112,109,186,186,185,112,108,187,186,186,109,108,82,81,188,188,185,82,59,189,188,188,81,59,112,185,188,188,189,112,59,190,191,191,189,59,101,141,191,191,190,101,112,189,191,191,141,112,78,192,193,193,194,78,105,102,193,193,192,105,101,194,193,193,102,101,78,77,195,195,192,78,52,196,195,195,77,52,105,192,195,195,196,105,52,197,198,198,196,52,154,152,198,198,197,154,105,196,198,198,152,105,74,199,200,200,201,74,98,95,200,200,199,98,94,201,200,200,95,94,74,73,202,202,199,74,45,203,202,202,73,45,98,199,202,202,203,98,45,204,205,205,203,45,87,164,205,205,204,87,98,203,205,205,164,98,70,206,207,207,208,70,91,88,207,207,206,91,87,208,207,207,88,87,70,69,209,209,206,70,38,210,209,209,69,38,91,206,209,209,210,91,38,211,212,212,210,38,115,175,212,212,211,115,91,210,212,212,175,91,66,213,214,214,183,66,82,187,214,214,213,82,108,183,214,214,187,108,66,65,215,215,213,66,64,216,215,215,65,64,82,213,215,215,216,82,64,217,218,218,216,64,53,80,218,218,217,53,82,216,218,218,80,82,59,219,220,220,190,59,78,194,220,220,219,78,101,190,220,220,194,101,59,58,221,221,219,59,57,222,221,221,58,57,78,219,221,221,222,78,57,223,224,224,222,57,46,76,224,224,223,46,78,222,224,224,76,78,52,225,226,226,197,52,227,228,226,226,225,227,154,197,226,226,228,154,52,51,229,229,225,52,50,230,229,229,51,50,227,225,229,229,230,227,50,231,232,232,230,50,233,234,232,232,231,233,227,230,232,232,234,227,45,235,236,236,204,45,70,208,236,236,235,70,87,204,236,236,208,87,45,44,237,237,235,45,43,238,237,237,44,43,70,235,237,237,238,70,43,239,240,240,238,43,7,68,240,240,239,7,70,238,240,240,68,70,38,241,242,242,211,38,86,180,242,242,241,86,115,211,242,242,180,115,38,37,243,243,241,38,13,244,243,243,37,13,86,241,243,243,244,86,13,245,246,246,244,13,60,84,246,246,245,60,86,244,246,246,84,86,34,247,248,248,249,34,64,61,248,248,247,64,60,249,248,248,61,60,34,33,250,250,247,34,32,251,250,250,33,32,64,247,250,250,251,64,32,252,253,253,251,32,53,217,253,253,252,53,64,251,253,253,217,64,27,254,255,255,256,27,57,54,255,255,254,57,53,256,255,255,54,53,27,26,257,257,254,27,25,258,257,257,26,25,57,254,257,257,258,57,25,259,260,260,258,25,46,223,260,260,259,46,57,258,260,260,223,57,20,261,262,262,263,20,50,47,262,262,261,50,46,263,262,262,47,46,20,19,264,264,261,20,18,265,264,264,19,18,50,261,264,264,265,50,18,266,267,267,265,18,233,231,267,267,266,233,50,265,267,267,231,50,13,268,269,269,245,13,270,271,269,269,268,270,60,245,269,269,271,60,13,12,272,272,268,13,11,273,272,272,12,11,270,268,272,272,273,270,11,274,275,275,273,11,276,277,275,275,274,276,270,273,275,275,277,270,6,278,279,279,280,6,43,40,279,279,278,43,39,280,279,279,40,39,6,5,281,281,278,6,4,282,281,281,5,4,43,278,281,281,282,43,4,283,284,284,282,4,7,239,284,284,283,7,43,282,284,284,239,43];
const vertices = [0,-0.930305,0,0.193558,-0.898431,0.140627,0.085689,-0.888288,0.263719,-0.073931,-0.89843,0.227539,0.393367,-0.786741,0.285795,0.129583,-0.822418,0.398807,-0.15025,-0.786741,0.462429,0.673174,-0.416049,0.489085,0.563546,-0.615787,0.409436,0.657405,-0.59791,0.276164,0.757104,-0.467921,0.268809,0.393367,-0.786741,0.285795,0.617237,-0.671233,0.143784,0.786735,-0.486234,0,0,-0.930305,0,-0.073931,-0.89843,0.227539,-0.224334,-0.888287,0.162988,-0.23925,-0.89843,0,-0.15025,-0.786741,0.462429,-0.339247,-0.822416,0.246477,-0.486229,-0.786739,0,0,-0.930305,0,-0.23925,-0.89843,0,-0.224334,-0.888287,-0.162988,-0.073931,-0.898431,-0.227539,-0.486229,-0.786739,0,-0.339247,-0.822416,-0.246477,-0.15025,-0.786741,-0.462429,0,-0.930305,0,-0.073931,-0.898431,-0.227539,0.085689,-0.888288,-0.263719,0.193558,-0.898431,-0.140626,-0.15025,-0.786741,-0.462429,0.129583,-0.822418,-0.398807,0.393367,-0.786741,-0.285795,0.828783,-0.320615,0.276165,0.802799,-0.228668,0.409437,0.876403,-0.251896,0.143784,0.879599,0,0.285796,-0.257126,-0.416049,0.791362,-0.021694,-0.467922,0.803114,-0.006541,-0.320615,0.873558,-0.141321,-0.228668,0.89003,0.243117,-0.486235,0.748227,0.134077,-0.251896,0.877939,0,0,0.924864,-0.832088,-0.416047,0,-0.770514,-0.46792,0.22754,-0.832827,-0.320613,0.26372,-0.890141,-0.228667,0.140627,-0.636482,-0.486234,0.46243,-0.79354,-0.251895,0.398809,-0.879599,0,0.285796,-0.257126,-0.416049,-0.791362,-0.454504,-0.467922,-0.662487,-0.50817,-0.320615,-0.71057,-0.408812,-0.228668,-0.803117,-0.636482,-0.486234,-0.46243,-0.624509,-0.251896,-0.63146,-0.543622,0,-0.74823,0.673174,-0.416049,-0.489085,0.489615,-0.467922,-0.636978,0.518761,-0.320615,-0.702876,0.63748,-0.228668,-0.636979,0.243117,-0.486235,-0.748227,0.407573,-0.251896,-0.789074,0.543622,0,-0.74823,0.743096,-0.149236,0.539887,0.63748,-0.228668,0.636979,0.746822,0.00727,0.542595,0.543622,0,0.74823,-0.283836,-0.149236,0.87356,-0.408812,-0.228668,0.803117,-0.28526,0.00727,0.87794,-0.543622,0,0.74823,-0.918517,-0.149235,0,-0.890141,-0.228667,-0.140627,-0.923122,0.00727,0,-0.879599,0,-0.285796,-0.283836,-0.149236,-0.87356,-0.141321,-0.228668,-0.89003,-0.28526,0.00727,-0.87794,0,0,-0.924864,0.743096,-0.149236,-0.539887,0.802799,-0.228668,-0.409437,0.746822,0.00727,-0.542595,0.879599,0,-0.285796,0.257126,0.416049,0.791362,0.454504,0.467922,0.662487,0.369522,0.59791,0.609836,0.215252,0.615787,0.662486,0.636482,0.486234,0.46243,0.414839,0.671233,0.479126,0.15025,0.786741,0.462429,-0.673174,0.416049,0.489085,-0.489615,0.467922,0.636978,-0.465802,0.59791,0.539885,-0.563546,0.615787,0.409436,-0.243117,0.486235,0.748227,-0.327487,0.671233,0.542592,-0.393367,0.786741,0.285795,-0.673174,0.416049,-0.489085,-0.757104,0.467921,-0.268809,-0.657405,0.59791,-0.276164,-0.563546,0.615787,-0.409436,-0.786735,0.486234,0,-0.617237,0.671233,-0.143784,-0.393367,0.786741,-0.285795,0.257126,0.416049,-0.791362,0.021694,0.467922,-0.803114,0.059498,0.59791,-0.710568,0.215252,0.615787,-0.662486,-0.243117,0.486235,-0.748227,-0.053992,0.671234,-0.631458,0.15025,0.786741,-0.462429,0.832088,0.416047,0,0.770514,0.46792,-0.22754,0.694179,0.597908,-0.162988,0.696581,0.615785,0,0.636482,0.486234,-0.46243,0.583871,0.671232,-0.246477,0.486229,0.786739,0,0.339247,0.822416,-0.246477,0.224334,0.888287,-0.162988,0.23925,0.89843,0,0.15025,0.786741,-0.462429,0.073931,0.89843,-0.227539,0,0.930305,0,0.453115,0.733163,-0.329207,0.414839,0.671233,-0.479126,0.454504,0.467922,-0.662487,0.369522,0.59791,-0.609836,0.215252,0.615787,-0.662486,-0.129583,0.822417,-0.398807,-0.085689,0.888288,-0.263719,0.073931,0.89843,-0.227539,-0.393367,0.786741,-0.285795,-0.193558,0.898431,-0.140627,0,0.930305,0,-0.173077,0.733164,-0.532667,-0.327487,0.671233,-0.542592,-0.489615,0.467922,-0.636978,-0.465802,0.59791,-0.539885,-0.563546,0.615787,-0.409436,-0.419333,0.822417,0,-0.277292,0.888288,0,-0.193558,0.898431,-0.140627,-0.393367,0.786741,0.285795,-0.193558,0.898431,0.140626,0,0.930305,0,-0.560082,0.733164,0,-0.617237,0.671233,0.143784,-0.757104,0.467921,0.268809,-0.657405,0.59791,0.276164,-0.673174,0.416049,0.489085,-0.563546,0.615787,0.409436,-0.129583,0.822417,0.398807,-0.085689,0.888288,0.263719,-0.193558,0.898431,0.140626,0.15025,0.786741,0.462429,0.073931,0.89843,0.227539,0,0.930305,0,-0.173077,0.733164,0.532667,-0.053992,0.671234,0.631458,0.021694,0.467922,0.803114,0.059498,0.59791,0.710568,0.215252,0.615787,0.662486,0.339247,0.822416,0.246477,0.224334,0.888287,0.162988,0.073931,0.89843,0.227539,0.486229,0.786739,0,0.23925,0.89843,0,0,0.930305,0,0.453115,0.733163,0.329207,0.583871,0.671232,0.246477,0.770514,0.46792,0.22754,0.694179,0.597908,0.162988,0.696581,0.615785,0,0.79354,0.251895,-0.398809,0.832827,0.320613,-0.26372,0.890141,0.228667,-0.140627,0.73316,0.173077,-0.532669,0.624509,0.251896,-0.63146,0.408812,0.228668,-0.803117,0.50817,0.320615,-0.71057,-0.134077,0.251896,-0.877939,0.006541,0.320615,-0.873558,0.141321,0.228668,-0.89003,-0.280043,0.173078,-0.861879,-0.407573,0.251896,-0.789074,-0.63748,0.228668,-0.636979,-0.518761,0.320615,-0.702876,-0.876403,0.251896,-0.143784,-0.828783,0.320615,-0.276165,-0.802799,0.228668,-0.409437,-0.906235,0.173077,0,-0.876403,0.251896,0.143784,-0.802799,0.228668,0.409437,-0.828783,0.320615,0.276165,-0.407573,0.251896,0.789074,-0.518761,0.320615,0.702876,-0.63748,0.228668,0.636979,-0.280043,0.173078,0.861879,-0.134077,0.251896,0.877939,0.141321,0.228668,0.89003,0.006541,0.320615,0.873558,0.624509,0.251896,0.63146,0.50817,0.320615,0.71057,0.408812,0.228668,0.803116,0.73316,0.173077,0.532669,0.79354,0.251895,0.398809,0.890141,0.228667,0.140627,0.832827,0.320613,0.26372,0.28526,-0.00727,-0.87794,0.283836,0.149236,-0.87356,0.280043,-0.173078,-0.861879,0.134077,-0.251896,-0.877939,-0.021694,-0.467922,-0.803114,-0.006541,-0.320615,-0.873558,-0.746822,-0.00727,-0.542595,-0.743096,0.149236,-0.539887,-0.73316,-0.173077,-0.532669,-0.79354,-0.251895,-0.398809,-0.770514,-0.46792,-0.22754,-0.832827,-0.320613,-0.26372,-0.746822,-0.00727,0.542595,-0.743096,0.149236,0.539887,-0.543622,0,0.74823,-0.63748,0.228668,0.636979,-0.73316,-0.173077,0.532669,-0.624509,-0.251896,0.63146,-0.454504,-0.467922,0.662487,-0.50817,-0.320615,0.71057,-0.257126,-0.416049,0.791362,-0.408812,-0.228668,0.803117,0.28526,-0.00727,0.87794,0.283836,0.149236,0.87356,0.280043,-0.173078,0.861879,0.407573,-0.251896,0.789074,0.489615,-0.467922,0.636978,0.518761,-0.320615,0.702876,0.923122,-0.00727,0,0.918516,0.149235,0,0.906235,-0.173077,0,0.876403,-0.251896,-0.143784,0.757104,-0.467921,-0.268809,0.828783,-0.320615,-0.276165,0.327487,-0.671233,-0.542592,0.465802,-0.59791,-0.539885,0.563546,-0.615787,-0.409436,0.173077,-0.733164,-0.532667,0.053992,-0.671234,-0.631458,-0.215252,-0.615788,-0.662486,-0.059498,-0.59791,-0.710568,-0.414839,-0.671233,-0.479126,-0.369522,-0.59791,-0.609835,-0.215252,-0.615788,-0.662486,-0.453115,-0.733163,-0.329207,-0.583871,-0.671232,-0.246477,-0.696581,-0.615785,0,-0.694179,-0.597908,-0.162988,-0.583871,-0.671232,0.246477,-0.694179,-0.597908,0.162988,-0.696581,-0.615785,0,-0.453115,-0.733163,0.329207,-0.414839,-0.671233,0.479126,-0.215252,-0.615787,0.662486,-0.369522,-0.59791,0.609836,0.617237,-0.671233,-0.143784,0.657405,-0.59791,-0.276164,0.393367,-0.786741,-0.285795,0.563546,-0.615787,-0.409436,0.560082,-0.733164,0,0.419333,-0.822417,0,0.193558,-0.898431,0.140627,0.277292,-0.888288,0,0,-0.930305,0,0.193558,-0.898431,-0.140626,0.053992,-0.671233,0.631458,-0.059498,-0.59791,0.710568,-0.215252,-0.615787,0.662486,0.173077,-0.733164,0.532667,0.327487,-0.671234,0.542592,0.563546,-0.615787,0.409436,0.465802,-0.59791,0.539885];
const normals = [0,-1,0,0.2271,-0.9598,0.165,0.1,-0.9462,0.3077,-0.0867,-0.9598,0.267,0.4253,-0.8506,0.309,0.146,-0.8812,0.4495,-0.1625,-0.8506,0.5,0.7236,-0.4472,0.5257,0.5929,-0.6803,0.4308,0.7017,-0.6573,0.2747,0.82,-0.5068,0.2657,0.4253,-0.8506,0.309,0.6626,-0.7361,0.138,0.8506,-0.5257,0,0,-1,0,-0.0867,-0.9598,0.267,-0.2618,-0.9462,0.1902,-0.2807,-0.9598,0,-0.1625,-0.8506,0.5,-0.3824,-0.8812,0.2778,-0.5257,-0.8506,0,0,-1,0,-0.2807,-0.9598,0,-0.2618,-0.9462,-0.1902,-0.0867,-0.9598,-0.267,-0.5257,-0.8506,0,-0.3824,-0.8812,-0.2778,-0.1625,-0.8506,-0.5,0,-1,0,-0.0867,-0.9598,-0.267,0.1,-0.9462,-0.3077,0.2271,-0.9598,-0.165,-0.1625,-0.8506,-0.5,0.146,-0.8812,-0.4495,0.4253,-0.8506,-0.309,0.9017,-0.3337,0.2747,0.8737,-0.2261,0.4308,0.9547,-0.2634,0.138,0.951,0,0.309,-0.2764,-0.4472,0.8506,0.0006,-0.5068,0.862,0.0174,-0.3337,0.9425,-0.1397,-0.2261,0.964,0.2629,-0.5257,0.809,0.1638,-0.2634,0.9507,0,0,1,-0.8944,-0.4472,0,-0.8196,-0.5068,0.267,-0.891,-0.3337,0.3077,-0.96,-0.2261,0.165,-0.6882,-0.5257,0.5,-0.8535,-0.2634,0.4495,-0.951,0,0.309,-0.2764,-0.4472,-0.8506,-0.5072,-0.5068,-0.697,-0.568,-0.3337,-0.7523,-0.4536,-0.2261,-0.862,-0.6882,-0.5257,-0.5,-0.6913,-0.2634,-0.6728,-0.5878,0,-0.809,0.7236,-0.4472,-0.5257,0.5061,-0.5068,-0.6978,0.5399,-0.3337,-0.7727,0.6797,-0.2261,-0.6978,0.2629,-0.5257,-0.809,0.4263,-0.2634,-0.8654,0.5878,0,-0.809,0.8018,-0.1337,0.5825,0.6797,-0.2261,0.6978,0.8087,0.0287,0.5875,0.5878,0,0.809,-0.3062,-0.1337,0.9425,-0.4536,-0.2261,0.862,-0.3089,0.0287,0.9507,-0.5878,0,0.809,-0.991,-0.1337,0,-0.96,-0.2261,-0.165,-0.9996,0.0287,0,-0.951,0,-0.309,-0.3062,-0.1337,-0.9425,-0.1397,-0.2261,-0.964,-0.3089,0.0287,-0.9507,0,0,-1,0.8018,-0.1337,-0.5825,0.8737,-0.2261,-0.4308,0.8087,0.0287,-0.5875,0.951,0,-0.309,0.2764,0.4472,0.8506,0.5072,0.5068,0.697,0.4062,0.6573,0.6347,0.2264,0.6803,0.697,0.6882,0.5257,0.5,0.4549,0.7361,0.5011,0.1625,0.8506,0.5,-0.7236,0.4472,0.5257,-0.5061,0.5068,0.6978,-0.4781,0.6573,0.5825,-0.5929,0.6803,0.4308,-0.2629,0.5257,0.809,-0.336,0.7361,0.5875,-0.4253,0.8506,0.309,-0.7236,0.4472,-0.5257,-0.82,0.5068,-0.2657,-0.7017,0.6573,-0.2747,-0.5929,0.6803,-0.4308,-0.8506,0.5257,0,-0.6626,0.7361,-0.138,-0.4253,0.8506,-0.309,0.2764,0.4472,-0.8506,-0.0006,0.5068,-0.862,0.0444,0.6573,-0.7523,0.2264,0.6803,-0.697,-0.2629,0.5257,-0.809,-0.0735,0.7361,-0.6728,0.1625,0.8506,-0.5,0.8944,0.4472,0,0.8196,0.5068,-0.267,0.7292,0.6573,-0.1902,0.7329,0.6803,0,0.6882,0.5257,-0.5,0.6172,0.7361,-0.2778,0.5257,0.8506,0,0.3824,0.8812,-0.2778,0.2618,0.9462,-0.1902,0.2807,0.9598,0,0.1625,0.8506,-0.5,0.0867,0.9598,-0.267,0,1,0,0.4911,0.7946,-0.3568,0.4549,0.7361,-0.5011,0.5072,0.5068,-0.697,0.4062,0.6573,-0.6347,0.2264,0.6803,-0.697,-0.146,0.8812,-0.4495,-0.1,0.9462,-0.3077,0.0867,0.9598,-0.267,-0.4253,0.8506,-0.309,-0.2271,0.9598,-0.165,0,1,0,-0.1876,0.7946,-0.5773,-0.336,0.7361,-0.5875,-0.5061,0.5068,-0.6978,-0.4781,0.6573,-0.5825,-0.5929,0.6803,-0.4308,-0.4726,0.8812,0,-0.3236,0.9462,0,-0.2271,0.9598,-0.165,-0.4253,0.8506,0.309,-0.2271,0.9598,0.165,0,1,0,-0.607,0.7946,0,-0.6626,0.7361,0.138,-0.82,0.5068,0.2657,-0.7017,0.6573,0.2747,-0.7236,0.4472,0.5257,-0.5929,0.6803,0.4308,-0.146,0.8812,0.4495,-0.1,0.9462,0.3077,-0.2271,0.9598,0.165,0.1625,0.8506,0.5,0.0867,0.9598,0.267,0,1,0,-0.1876,0.7946,0.5773,-0.0735,0.7361,0.6728,-0.0006,0.5068,0.862,0.0444,0.6573,0.7523,0.2264,0.6803,0.697,0.3824,0.8812,0.2778,0.2618,0.9462,0.1902,0.0867,0.9598,0.267,0.5257,0.8506,0,0.2807,0.9598,0,0,1,0,0.4911,0.7946,0.3568,0.6172,0.7361,0.2778,0.8196,0.5068,0.267,0.7292,0.6573,0.1902,0.7329,0.6803,0,0.8535,0.2634,-0.4495,0.891,0.3337,-0.3077,0.96,0.2261,-0.165,0.7946,0.1876,-0.5773,0.6913,0.2634,-0.6728,0.4536,0.2261,-0.862,0.568,0.3337,-0.7523,-0.1638,0.2634,-0.9507,-0.0174,0.3337,-0.9425,0.1397,0.2261,-0.964,-0.3035,0.1876,-0.9342,-0.4263,0.2634,-0.8654,-0.6797,0.2261,-0.6978,-0.5399,0.3337,-0.7727,-0.9547,0.2634,-0.138,-0.9017,0.3337,-0.2747,-0.8737,0.2261,-0.4308,-0.9822,0.1876,0,-0.9547,0.2634,0.138,-0.8737,0.2261,0.4308,-0.9017,0.3337,0.2747,-0.4263,0.2634,0.8654,-0.5399,0.3337,0.7727,-0.6797,0.2261,0.6978,-0.3035,0.1876,0.9342,-0.1638,0.2634,0.9507,0.1397,0.2261,0.964,-0.0174,0.3337,0.9425,0.6913,0.2634,0.6728,0.568,0.3337,0.7523,0.4536,0.2261,0.862,0.7946,0.1876,0.5773,0.8535,0.2634,0.4495,0.96,0.2261,0.165,0.891,0.3337,0.3077,0.3089,-0.0287,-0.9507,0.3062,0.1337,-0.9425,0.3035,-0.1876,-0.9342,0.1638,-0.2634,-0.9507,0.0006,-0.5068,-0.862,0.0174,-0.3337,-0.9425,-0.8087,-0.0287,-0.5875,-0.8018,0.1337,-0.5825,-0.7946,-0.1876,-0.5773,-0.8535,-0.2634,-0.4495,-0.8196,-0.5068,-0.267,-0.891,-0.3337,-0.3077,-0.8087,-0.0287,0.5875,-0.8018,0.1337,0.5825,-0.5878,0,0.809,-0.6797,0.2261,0.6978,-0.7946,-0.1876,0.5773,-0.6913,-0.2634,0.6728,-0.5072,-0.5068,0.697,-0.568,-0.3337,0.7523,-0.2764,-0.4472,0.8506,-0.4536,-0.2261,0.862,0.3089,-0.0287,0.9507,0.3062,0.1337,0.9425,0.3035,-0.1876,0.9342,0.4263,-0.2634,0.8654,0.5061,-0.5068,0.6978,0.5399,-0.3337,0.7727,0.9996,-0.0287,0,0.991,0.1337,0,0.9822,-0.1876,0,0.9547,-0.2634,-0.138,0.82,-0.5068,-0.2657,0.9017,-0.3337,-0.2747,0.336,-0.7361,-0.5875,0.4781,-0.6573,-0.5825,0.5929,-0.6803,-0.4308,0.1876,-0.7946,-0.5773,0.0735,-0.7361,-0.6728,-0.2264,-0.6803,-0.697,-0.0444,-0.6573,-0.7523,-0.4549,-0.7361,-0.5011,-0.4062,-0.6573,-0.6347,-0.2264,-0.6803,-0.697,-0.4911,-0.7946,-0.3568,-0.6172,-0.7361,-0.2778,-0.7329,-0.6803,0,-0.7292,-0.6573,-0.1902,-0.6172,-0.7361,0.2778,-0.7292,-0.6573,0.1902,-0.7329,-0.6803,0,-0.4911,-0.7946,0.3568,-0.4549,-0.7361,0.5011,-0.2264,-0.6803,0.697,-0.4062,-0.6573,0.6347,0.6626,-0.7361,-0.138,0.7017,-0.6573,-0.2747,0.4253,-0.8506,-0.309,0.5929,-0.6803,-0.4308,0.607,-0.7946,0,0.4726,-0.8812,0,0.2271,-0.9598,0.165,0.3236,-0.9462,0,0,-1,0,0.2271,-0.9598,-0.165,0.0735,-0.7361,0.6728,-0.0444,-0.6573,0.7523,-0.2264,-0.6803,0.697,0.1876,-0.7946,0.5773,0.336,-0.7361,0.5875,0.5929,-0.6803,0.4308,0.4781,-0.6573,0.5825];

export {indices, vertices, normals}
