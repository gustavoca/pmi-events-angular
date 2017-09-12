const BASE = "?filter=";
const structure = {"fields": {}};

export class Filter {
  public static encode(fields) {
    let result = structure;
    fields.forEach(field => {
      result.fields[field] = "true";
    });
    return `${BASE}${encodeURIComponent(JSON.stringify(result))}`;
  }
}
