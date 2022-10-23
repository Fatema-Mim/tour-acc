const Package = require("../models/Package");

exports.getPackageService = async (filters,quries) =>{
    const packages = await Package.find(filters)
    .skip(quries.skip).limit(quries.limit)
    .select(quries.fields).sort(quries.sortBy)
    const totalPackage = await Package.countDocuments(filters);
    const pageCount = Math.ceil(totalPackage/quries.limit)

    return {totalPackage,pageCount,packages};
}

exports.createPackageService = async (data) =>{
        const package=  new Package(data);
        const result = await package.save();
        return result 
}



exports.bulkUpdatePackageService = async  (data) =>{
    const packages = [];
    data.ids.forEach(package =>{
        packages.push(Package.updateOne({_id:package.id},package.data));
    });
    const result = await Promise.all(packages)
    return result;

};
exports.updatePackageServices = async (packageId,data) =>{
    const package = await Package.findById(packageId);
    const result = await package.set(data).save();
    return result
};

exports.deletePackageService = async (id)=>{
    const result =  await Package.deleteOne({_id:id});
    return result;
};

exports.bulkDeletedPackageService = async  (ids) =>{
    const result = await Package.deleteMany({_id:ids});
    return result
}