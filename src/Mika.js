'use strict';
let Mika = {
    modules: [],
    register: function(module){
        //Register of module
        this.modules.push(module);
    },
    run: function (comand,parameters) {
        console.log(comand);
        for( let i = 0; i < (this.modules.length); i++ ){
            Object.keys(this.modules[i].comands).forEach((cmd) => {
                if(comand === cmd){
                    return this.modules[i].run(cmd,parameters);
                }
            });
        }
    }
};

module.exports = Mika;