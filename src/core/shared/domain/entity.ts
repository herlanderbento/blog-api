import { ValueObject } from "./value_object.js";

export abstract class Entity {
  abstract get entity_id(): ValueObject
  abstract toJSON(): any
}
