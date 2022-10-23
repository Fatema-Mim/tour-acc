const { getPackageService, createPackageService, updatePackageServices, bulkUpdatePackageService, deletePackageService, bulkDeletedPackageService } = require("../services/package.services");

exports.getPackages = async(req,res,next)=>{
    try {

        let filters = {...req.query};

        const excludeFields = ['sort','page','limit']
        excludeFields.forEach(field=>delete filters[field]);

        const quries = {}
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ');
            quries.sortBy= sortBy
        }
        if(req.query.fields){
            const fields = req.query.fields.split(',').join(' ')
            quries.fields = fields
        }

        let filterString = JSON.stringify(filters);
        filterString = filterString.replace(/\b(gt|gte|lt|lte)\b/g, match=> `$${match}`)
        filters = JSON.parse(filterString)

        if(req.query.page){
            const {page = 1 , limit=5} = req.query

            const skip = (page - 1) * parseInt(limit);
            quries.skip = skip;
            quries.limit = parseInt(limit)
        }

        const packages = await getPackageService(filters,quries);

         res.status(200).json({
            status:'Success',
            message:'Data find Successfully',
            data: packages
        })
        
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:'Data is couldnot found',
            error:error.message
        })
    }
};

exports.createPackage =  async (req,res,next)=>{
    try {
        const result = await createPackageService(req.body)
        result.logger()

        res.status(200).json({
            status:'Success',
            message:'Data Inserted Successfully',
            data: result
        })

    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:'Data is not inserted',
            error:error.message
        })
    }
}

exports.updatePackage = async (req,res,next)=>{
    try {
        const {id} = req.params;
        const result = await updatePackageServices(id, req.body);

        res.status(200).json({
            status:'Successfully updated',
            data:result
        })
        
    } catch (error) {
        res.status(400).json({
            status:'faild',
            message:"couldnot updated",
            error:error.message
        })
    }
};

exports.bulkUpdatePackage = async (req,res,next) =>{
  try {
    const result = await bulkUpdatePackageService(req.body)

    res.status(200).json({
      status: 'success',
      message:'Data update Successfully',
      data: result
    })
    
  } catch (error) {
     res.status(400).json({
      status:'failed',
      message:"Couldn't update the product",
      error:error.message
    })
    
  }
};
exports.deletePackage = async (req,res,next) =>{
    try {
        const {id} = req.params;
        const result =  await deletePackageService(id);

        if(!result.deletedCount){
            res.status(400).json({
            status: 'fail',
            message:'Data couldnot find',
            error:error.message
            })
        }

        res.status(200).json({
            status:'success',
            message:'successfully deleted'
        })

        
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:'Couldnot deleted',
            error:error.message
        })
    }
};

exports.bulkDeletePackage = async (req,res,next) =>{
  try {
    const result = await bulkDeletedPackageService(req.body.ids)

    res.status(200).json({
      status: 'success',
      message:'Given data deleted Successfully',
      data: result
    })
    
  } catch (error) {
     res.status(400).json({
      status:'failed',
      message:"Couldn't delete the given data",
      error:error.message
    })
    
  }
};