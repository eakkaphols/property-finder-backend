const router = require("express").Router();
const controllers = require("../../controllers/user.controller");
const auth = require("../auth");
const validator = require("../../validators");

/**
 *  @swagger
 *   components:
 *     schemas:
 *       user:
 *         type: object
 *         required:
 *           - username
 *           - password
 *         properties:
 *           _id:
 *             type: string
 *             description: The auto-generated id of the user.
 *           username:
 *             type: string
 *             description: The username of your account.
 *           password:
 *             type: string
 *             description: password
 *           fullname:
 *             type: string
 *             description: firstname and lastname
 *           email:
 *             type: string
 *             description: email
 *           tel:
 *             type: string
 *             description: contact number number only
 *           role:
 *             type: string
 *             description: role of user
 *           createdatdate:
 *             type: string
 *             format: date
 *             description: The date of the record creation.
 *           updatedatdate:
 *             type: string
 *             format: date
 *             description: The date of the record revision.
 *         example:
 *            _id: 6040470751a9918ce4b87c51
 *            username: wanidas
 *            password: d95e6c90baf2d31a00a68eb1234e89d1ec3615e4
 *            fullname: wanida wattanachai
 *            email: eaew_wanida19@hotmail.com
 *            tel: 866849656
 *            role: user
 *            createdatdate: 2021-03-03T00:00:00.000Z
 *            updatedatdate: 2021-03-03T00:00:00.000Z
 */

/**
 *  @swagger
 *  tags:
 *    name: Users
 *    description: API to manage your user.
 */

//API Docs
/**
 * @swagger
 * path:
 * /users:
 *   get:
 *     summary: Retrieve a list of users.
 *     tags: [Users]
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 * @swagger
 *  /users/{id}:
 *    get:
 *      summary: Gets a user by id
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *            default: '6040464351a9918ce4b87c50'
 *          required: true
 *          description: The user id
 *      responses:
 *        "200":
 *          description: The list of user.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/user'
 *        "404":
 *          description: User not found.
 */
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login to the application
 *     tags: [Users]
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/user'
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *               default: 'wanidas'
 *             password:
 *               type: string
 *               format: password
 *               default: 'abc123**'
 *         required:
 *           - username
 *           - password
 *     responses:
 *       '200':
 *         description: User found and logged in successfully
 *       '401':
 *         description: Bad username, not found in db
 *       '403':
 *         description: Username and password don't match
 */
/**
 * @swagger
 * /users/updateuser/{id}:
 *   put:
 *     tags:
 *       - Users
 *     name: Update User
 *     summary: Update user info
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *           default: '6040464351a9918ce4b87c50'
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/user'
 *           type: object
 *           properties:
 *             username :
 *               type:string
 *             fullname:
 *               type: string
 *             email:
 *               type: string
 *             tel:
 *               type: string
 *             role:
 *               type: string
 *         required:
 *           - username
 *     responses:
 *       '200':
 *         description: User info updated
 *       '403':
 *         description: No authorization / user not found
 */
router.get("/", controllers.onGetAll);
router.get("/:id", controllers.onGetById);
router.post("/login", controllers.onLogin);
router.put("/updateuser/:id", controllers.onUpdate);
router.post("/register", controllers.onRegister);
router.put("/updatepassword", controllers.onUpdatePassword);

module.exports = router;
