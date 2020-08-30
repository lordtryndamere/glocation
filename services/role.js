const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function() {
ac.grant("comprador")
 .readOwn("profile")
 .updateOwn("profile")
 .readAny('facture')
 .readAny('puntoventas')
 .readAny('product')


ac.grant("admin_empresa")
.readOwn("profile")
.updateOwn("profile")

.createAny('puntoventas')
.readAny('puntoventas')
.updateAny('puntoventas')
.deleteAny('puntoventas')

.createAny('product')
.readAny('product')
.updateAny('product')
.deleteAny('product')

.createAny('inventary')
.readAny('inventary')
.updateAny('inventary')
.deleteAny('inventary')

.createAny('sales')
.readAny('sales')
.updateAny('sales')
.deleteAny('sales')

.createAny('business')
.readAny('business')
.updateAny('business')
.deleteAny('business')

.createAny('category')
.readAny('category')
.updateAny('category')
.deleteAny('category')




ac.grant("admin")
.createAny('profile')
.readAny('profile')
.updateAny('profile')
.deleteAny('profile')

.createAny('business')
.readAny('business')
.updateAny('business')
.deleteAny('business')

.createAny('facture')
.readAny('facture')
.updateAny('facture')
.deleteAny('facture')

.createAny('category')
.readAny('category')
.updateAny('category')
.deleteAny('category')

.createAny('inventary')
.readAny('inventary')
.updateAny('inventary')
.deleteAny('inventary')

.createAny('puntoventas')
.readAny('puntoventas')
.updateAny('puntoventas')
.deleteAny('puntoventas')

.createAny('product')
.readAny('product')
.updateAny('product')
.deleteAny('product')

.createAny('sales')
.readAny('sales')
.updateAny('sales')
.deleteAny('sales')
 

return ac;
})();