const { NotImplementedError } = require("../extensions/index.js");

// const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
class BinarySearchTree {
  constructor() {
    this.tree = null;
  }

  root() {
    return this.tree;
  }

  add(value) {
    this.tree = addWithin(this.tree, value);

    function addWithin(node, value) {
      if (!node) {
        //нет узла, добавляем. затем он будет потомком для существующего узла
        return new Node(value);
      }

      if (node.value === value) {
        //узлы совпадают, ничего не делаем
        return node;
      }

      if (value < node.value) {
        node.left = addWithin(node.left, value); //рекурсия, кладем или новый узел, или ничего влево
      } else {
        node.right = addWithin(node.right, value);
      }

      return node;
    }
  }

  find(data) {
    function findNode(node, data) {
      if (!node) {
        return null;
      }
      if (node.data === data) {
        return node;
      }
      if (node.data < data) {
        return findNode(node.right, data);
      }
      return findNode(node.left, data);
    }
    return findNode(this.tree, data);
  }

  has(value) {
    return searchWithin(this.tree, value);

    function searchWithin(node, value) {
      if (!node) {
        return false;
      }

      if (node.value === value) {
        return true;
      }

      return value < node.value
        ? searchWithin(node.left, value) //поиск внутри левого узла (подузла)
        : searchWithin(node.right, value);
    }
  }

  remove(value) {
    this.tree = removeNode(this.tree, value); //удалить узел в поддереве

    function removeNode(node, value) {
      if (!node) {
        return null;
      }

      if (value < node.value) {
        node.left = removeNode(node.left, value); // новое дерево будет в node.left
        return node;
      } else if (node.value < value) {
        node.right = removeNode(node.right, value);
        return node;
      } else {
        // value === node.value
        // equal - should remove this item
        if (!node.left && !node.right) {
          // текущий узел лист или нет
          // put null instead of item
          return null;
        }

        if (!node.left) {
          // есть правый потомок
          // set right child instead of item
          node = node.right; // помещаем правое поддерево
          return node;
        }

        if (!node.right) {
          // есть левый потомок
          // set left child instead of item
          node = node.left;
          return node;
        }

        // both children exists for this item
        let minFromRight = node.right; // ищем минимум среди правого
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.value = minFromRight.value;

        node.right = removeNode(node.right, minFromRight.value); // удалить миним узел из правого поддерева

        return node;
      }
    }
  }

  min() {
    if (!this.tree) {
      return;
    }

    let node = this.tree;
    while (node.left) {
      //кто нить меньше слева
      node = node.left; //самый левый элемент
    }

    return node.value; // значение самого маленького
  }

  max() {
    if (!this.tree) {
      return;
    }

    let node = this.tree;
    while (node.right) {
      //ищем справа
      node = node.right;
    }

    return node.value;
  }
}

module.exports = {
  BinarySearchTree,
};
