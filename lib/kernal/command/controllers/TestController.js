'use strict';

const Controller = use('controller/Controller');

/**
 * @Controller('test')
 */
module.exports = class TestController extends Controller {

  /**
   * @Route(
   *   value="command.user",
   *   pattern="/user/$user"
   * )
   * @param {Request} request
   */
  user(request) {
    const id = request.get('user');
    log(id);
  }

  /**
   * @Route(
   *   value="command.user.view",
   *   pattern="/user/$user/view"
   * )
   * @param {Request} request
   */
  view(request) {
    const id = request.get('user');
    log(id);
  }

  /**
   * @Route(
   *   value="command.user.view.all",
   *   pattern="/user/$user/view/*?id=$id"
   * )
   * @param {Request} request
   */
  cool(request) {
    const user = request.get('user');
    const after = request.get('_');
    const id = request.get('id');
    log(user, after, id);
  }

}
