﻿using App.Helpers;
using System.Text.Json;

namespace App.Extensions;

public static class HttpResponseExtensions
{
    public static void AddPaginationHeader(this HttpResponse response, 
                                            PaginationHeader header)
    {
        var jsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };

        response.Headers.Add("Pagination", JsonSerializer.Serialize(header, jsonOptions));
        response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
    }
}
