﻿namespace App.Errors;

// esta es la respuesta q manda mi ExceptionMiddleware cuando 
// hay una excepcion
public class Exception
{
    public Exception(int statusCode, string message = null,
                        string details = null)
    {
        StatusCode = statusCode;
        Message = message;
        Details = details;
    }

    public int StatusCode { get; set; }
    public string Message { get; set; }
    public string Details { get; set; }
}
