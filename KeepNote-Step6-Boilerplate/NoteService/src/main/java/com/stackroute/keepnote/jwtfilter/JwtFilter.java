package com.stackroute.keepnote.jwtfilter;


import org.springframework.web.filter.GenericFilterBean;

import com.fasterxml.jackson.core.JsonParseException;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;



/* This class implements the custom filter by extending org.springframework.web.filter.GenericFilterBean.  
 * Override the doFilter method with ServletRequest, ServletResponse and FilterChain.
 * This is used to authorize the API access for the application.
 */


public class JwtFilter extends GenericFilterBean {

	
	
	

	/*
	 * Override the doFilter method of GenericFilterBean.
     * Retrieve the "authorization" header from the HttpServletRequest object.
     * Retrieve the "Bearer" token from "authorization" header.
     * If authorization header is invalid, throw Exception with message. 
     * Parse the JWT token and get claims from the token using the secret key
     * Set the request attribute with the retrieved claims
     * Call FilterChain object's doFilter() method */
	
	
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
    	HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;
		String authHeader = req.getHeader("authorization");
		
		if("OPTIONS".equals(req.getMethod())){
			res.setStatus(HttpServletResponse.SC_OK);
			chain.doFilter(request, response);
		}else {
			
			if(authHeader == null || !authHeader.startsWith("Bearer ")) {
				throw new ServletException("Missing or Invalid Authorization header");
			}
			System.out.println(authHeader);
			System.out.println("***************");
			System.out.println(authHeader.split(" ").length);
			System.out.println("***************");
			String token = authHeader.split(" ")[1];			
			try {
			final Claims claims = Jwts.parser().setSigningKey("secretKey").parseClaimsJws(token).getBody();
			System.out.println("test2");
			request.setAttribute("claims", claims);
			chain.doFilter(request, response);
			}catch(JsonParseException j) {
				System.out.println(j.getMessage());
			}

		}
    }
}
