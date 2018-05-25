'use strict';
let Mika = {
    modules: [],
    register: function(module){
        this.modules.push(module);
    },
    run: async function (comand,parameters) {
        let module = null;
        let c = null;

        for( let i = 0; i < (this.modules.length); i++ ){
            Object.keys(this.modules[i].comands).forEach((cmd) => {
                if(comand === cmd){
                    module = this.modules[i];
                    c = comand;
                    return true;
                }
            });
        }
        return await module.run(c,parameters);
    }
};

module.exports = Mika;