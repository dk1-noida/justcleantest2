/**
   * @api {get} /about About Us
   * @apiName About Us
   * @apiGroup Aboutus Controller
   * @apiDescription  Previous end point /ws/aboutus/{languageid}.
   *
   * @apiHeaderExample {json} Header-Example: 
   *     {
   *       "language_id": "1"
   *     }
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {    
   *        "status": true,
   *        "code": 200,
   *        "error": "SFD",
   *        "message": "About Us listed successfully",   
   *        "data": [{            
   *            "description": "Masbagti consumer contract"        
   *         }]
   *      }
   *
   * @apiErrorExample {json} Error-Response:
   *     HTTP/1.1 403 Forbidden
   *     {
   *        "status": false,
   *        "code": 403,
   *        "error": "NODEEXP",
   *        "message": "Error: Language ID is required!",
   *        "data": null
   *     }
   */